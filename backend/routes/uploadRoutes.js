const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/', upload.single('image'), (req, res) => {
  res.status(200).json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
