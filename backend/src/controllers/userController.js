const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email } = req.body;
    const fieldsToUpdate = {};

    if (name) fieldsToUpdate.name = name;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }
      fieldsToUpdate.email = email;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all addresses
// @route   GET /api/user/addresses
// @access  Private
exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add new address
// @route   POST /api/user/addresses
// @access  Private
exports.addAddress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const user = await User.findById(req.user.id);
    
    // If this is set as default, unset other defaults
    if (req.body.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push(req.body);
    await user.save();

    res.status(201).json({
      success: true,
      address: user.addresses[user.addresses.length - 1],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update address
// @route   PUT /api/user/addresses/:addressId
// @access  Private
exports.updateAddress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const user = await User.findById(req.user.id);
    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    // If setting as default, unset other defaults
    if (req.body.isDefault) {
      user.addresses.forEach(addr => {
        if (addr._id.toString() !== req.params.addressId) {
          addr.isDefault = false;
        }
      });
    }

    Object.assign(address, req.body);
    await user.save();

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete address
// @route   DELETE /api/user/addresses/:addressId
// @access  Private
exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    user.addresses.pull(req.params.addressId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all cards
// @route   GET /api/user/cards
// @access  Private
exports.getCards = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      cards: user.cards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add new card
// @route   POST /api/user/cards
// @access  Private
exports.addCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const user = await User.findById(req.user.id);
    
    // If this is set as default, unset other defaults
    if (req.body.isDefault) {
      user.cards.forEach(card => card.isDefault = false);
    }

    user.cards.push(req.body);
    await user.save();

    res.status(201).json({
      success: true,
      card: user.cards[user.cards.length - 1],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update card
// @route   PUT /api/user/cards/:cardId
// @access  Private
exports.updateCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const user = await User.findById(req.user.id);
    const card = user.cards.id(req.params.cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found',
      });
    }

    // If setting as default, unset other defaults
    if (req.body.isDefault) {
      user.cards.forEach(c => {
        if (c._id.toString() !== req.params.cardId) {
          c.isDefault = false;
        }
      });
    }

    Object.assign(card, req.body);
    await user.save();

    res.status(200).json({
      success: true,
      card,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete card
// @route   DELETE /api/user/cards/:cardId
// @access  Private
exports.deleteCard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const card = user.cards.id(req.params.cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found',
      });
    }

    user.cards.pull(req.params.cardId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Card deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all orders
// @route   GET /api/user/orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      orders: user.orders.sort((a, b) => b.orderDate - a.orderDate),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

