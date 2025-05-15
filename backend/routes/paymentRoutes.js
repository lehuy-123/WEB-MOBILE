const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, method: 'COD', name: 'Thanh toán khi nhận hàng' },
    { id: 2, method: 'BANK', name: 'Chuyển khoản ngân hàng' }
  ]);
});

module.exports = router;
