const Product = require('./models/product');
const {connectDB} = require('./db/connect');
const jsonProducts  = require('./products.json');
require('dotenv').config()




const start = async () => {
   try{
     await connectDB(process.env.DATABASE_URI);
     await Product.deleteMany();
     await Product.create(jsonProducts)
     console.log('connected..')
     process.exit(0)
   }catch(err){
     console.log(err)
     process.exit(1);
   }
}
start()