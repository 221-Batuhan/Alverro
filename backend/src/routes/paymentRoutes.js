const express = require('express');
const router = express.Router();
const {
  initiatePayment,
  handleCallback,
  getPaymentStatus,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Initiate payment (protected)
router.post('/iyzico/initiate', protect, initiatePayment);

// Payment callback (public - Iyzico will call this)
router.post('/iyzico/callback', handleCallback);

// Get payment status (protected)
router.get('/status/:orderId', protect, getPaymentStatus);

module.exports = router;

