const express = require('express');
const router = express.Router();

const { addToCart, getCart, updateCartItem, deleteCartItem } = require('../controllers/cartController');



router.post('/', addToCart);
router.get('/', getCart); // ✅ Thêm dòng này
router.put('/:productId', updateCartItem); // ✅ Thêm dòng này
router.delete('/:productId', deleteCartItem); // ✅ Thêm route xoá sản phẩm


module.exports = router;
