const router = require('express').Router();
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
} = require("../controllers/products");

// get All products + create produt 
router.route('/').get(getAllProducts).post(createProduct);

// get single product + update product + delete product
router.route('/:id').get(getSingleProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;