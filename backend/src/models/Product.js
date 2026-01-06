const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be positive'],
  },
  images: [{
    type: String,
    required: true,
  }],
  gender: {
    type: String,
    enum: ['MEN', 'WOMEN'],
    required: [true, 'Gender is required'],
  },
  line: {
    type: String,
    enum: ['MAIN', 'DONNA'],
    required: [true, 'Line is required'],
    default: 'MAIN',
  },
  category: {
    type: String,
    trim: true,
  },
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  }],
  colors: [{
    type: String,
    trim: true,
  }],
  isLimitedEdition: {
    type: Boolean,
    default: false,
  },
  inspirationText: {
    type: String,
    trim: true,
  },
  craftsmanshipNotes: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
productSchema.index({ gender: 1, line: 1 });
productSchema.index({ isActive: 1, featured: 1 });
productSchema.index({ line: 1, isActive: 1 });

module.exports = mongoose.model('Product', productSchema);


