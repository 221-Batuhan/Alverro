const { body } = require('express-validator');

// Validation rules for registration
exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// Validation rules for login
exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Validation rules for profile update
exports.profileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
];

// Validation rules for address
exports.addressValidation = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  body('addressLine1')
    .trim()
    .notEmpty()
    .withMessage('Address line 1 is required'),
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('zipCode')
    .trim()
    .notEmpty()
    .withMessage('Zip code is required'),
  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required'),
];

// Validation rules for card
exports.cardValidation = [
  body('cardholderName')
    .trim()
    .notEmpty()
    .withMessage('Cardholder name is required'),
  body('last4')
    .trim()
    .notEmpty()
    .withMessage('Last 4 digits are required')
    .isLength({ min: 4, max: 4 })
    .withMessage('Last 4 must be exactly 4 digits'),
  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Card brand is required')
    .isIn(['visa', 'mastercard', 'amex'])
    .withMessage('Invalid card brand'),
  body('expiryMonth')
    .trim()
    .notEmpty()
    .withMessage('Expiry month is required'),
  body('expiryYear')
    .trim()
    .notEmpty()
    .withMessage('Expiry year is required'),
];

