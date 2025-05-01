const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', auth, checkRole('admin'), createProduct);
router.put('/:id', auth, checkRole('admin'), updateProduct);
router.delete('/:id', auth, checkRole('admin'), deleteProduct);

module.exports = router;
