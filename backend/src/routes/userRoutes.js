const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  getCards,
  addCard,
  updateCard,
  deleteCard,
  getOrders,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const {
  profileValidation,
  addressValidation,
  cardValidation,
} = require('../middleware/validators');

// Profile routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, profileValidation, updateProfile);

// Address routes
router.get('/addresses', protect, getAddresses);
router.post('/addresses', protect, addressValidation, addAddress);
router.put('/addresses/:addressId', protect, addressValidation, updateAddress);
router.delete('/addresses/:addressId', protect, deleteAddress);

// Card routes
router.get('/cards', protect, getCards);
router.post('/cards', protect, cardValidation, addCard);
router.put('/cards/:cardId', protect, cardValidation, updateCard);
router.delete('/cards/:cardId', protect, deleteCard);

// Order routes
router.get('/orders', protect, getOrders);

module.exports = router;

