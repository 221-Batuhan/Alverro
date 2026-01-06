const express = require('express');
const router = express.Router();
const {
  getDonnaImages,
  getDonnaImage,
} = require('../controllers/donnaController');

// Public routes
router.get('/images', getDonnaImages);
router.get('/images/:id', getDonnaImage);

module.exports = router;

