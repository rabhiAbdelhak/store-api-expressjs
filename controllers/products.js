const asyncWrapper = require('../middleware/AsyncWrapper');
const product = require('../models/product');
const Product = require('../models/product');

//get all products
const getAllProducts =  async (req, res) => {
        const {featured , company, name, sort, fields, numericFiters} = req.query
        const page  = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        console.log(page, limit)
        const queryObject = {}
        //making the query
        if(featured) queryObject.featured = featured === 'true' ? true : false;
        if(company)  queryObject.company = company
        if(name)     queryObject.name = {$regex: name, $options: 'i'};
        if(numericFiters) {
                let operators = {
                        '>' : '$gt',
                        '>=': '$gte',
                        '=' : '$eq',
                        '<' : '$lt',
                        '<=': '$lte',
                 }
                 const numberfields = ['price', 'rating']
                 const regex = /\b(<|>|<=|>=|=)\b/g;
                 let filters = numericFiters.replace(regex , (match) => `-${operators[match]}-`)
                 filters.split(',').forEach(filter => {
                      const [key ,op , value] = filter.split('-');
                      if(numberfields.includes(key)){
                        if(!queryObject.hasOwnProperty(key)){
                                queryObject[key] = {[op] : Number(value)};
                              }else{
                                queryObject[key][op] = Number(value);
                              } 
                      }
                 })
        }
        console.log(queryObject);
        //end of query making
        let result =  Product.find(queryObject);
        if(sort){
            let sortoptions = sort.split(',').join(' ');
            result = result.sort(sortoptions);
        }

        if(fields){
                let fieldsOptions = fields.split(',').join(' ');
                result = result.select(fieldsOptions);
        }
        if(page){
                let skip = ((page -1) *limit);
                result = result.limit(limit).skip(skip)
        }
        const  products = await result;
        res.status(201).json({success: true, data: products, total_products : products.length});
}

//create product
const createProduct = asyncWrapper(async(req, res) => {
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(200).json({success : true, data: product})
})

// get single product
const getSingleProduct = asyncWrapper( async (req, res) => {
        const {id} = req.params
        const product = await Product.findOne({_id: id});
        if(!product){
            return next(createCustomError(404, `The product with ID "${id}" can't be found !`));
        }
        res.status(201).json({success: true, data: product});
})
//update product
const updateProduct = asyncWrapper( async (req, res) => {
        const {id} = req.params
        const product = await Product.findOneAndUpdate({_id: id}, req.body, {
                new: true,
                runValidators: true
        });
        if(!product){
            return next(createCustomError(404, `The product with ID "${id}" can't be found !`));
        }
        res.status(201).json({success: true, data: product});
})
//delete product
const deleteProduct = asyncWrapper( async (req, res) => {
        const {id} = req.params
        const product = await Product.findOneAndDelete({_id: id});
        if(!product){
            return next(createCustomError(404, `The product with ID "${id}" can't be found !`));
        }
        res.status(201).json({success: true, data: product});
});


module.exports = {createProduct, getAllProducts, deleteProduct, updateProduct, getSingleProduct}