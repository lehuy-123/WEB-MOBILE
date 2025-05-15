const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.json({
    name: 'Nguyễn Văn A',
    email: 'a@example.com',
    avatar: 'https://i.pravatar.cc/100'
  });
});

module.exports = router;
