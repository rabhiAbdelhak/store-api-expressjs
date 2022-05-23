const mongoose = require('mongoose');



const productSchema = mongoose.Schema({
   name : {
    type: String,
    required: [true, 'You have to provide the product name'],
    maxLength : [30, 'th product name must be less then 30 caracters']
   },
   price : {
       type: Number,
       required: [true, 'product price must be provided'],
   },
   featured: {
       type: Boolean,
       default: false,
   },
   rating : {
       type: Number,
       default: 4.5
   },
   createdAt: {
       type: Date,
       default: Date.now(),
   },
   company : {
       type: String,
       enum : ['ikea', 'liddy', 'caressa', 'marcos']
   },
});



module.exports = mongoose.model('Product' , productSchema);
