const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  address: {
    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, default: '' },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true, default: 'Italy' },
    phone: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'Iyzico',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentDetails: {
    last4Digits: { type: String },
    cardType: { type: String },
    paidAmount: { type: Number },
    iyzicoPaymentId: { type: String },
    iyzicoConversationId: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

/**
 * Generate unique order number before validation.
 * Using 'pre-validate' ensures the number is generated 
 * BEFORE Mongoose checks the 'required: true' rule.
 * * NOTE: We removed 'next' because this is an async function.
 */
orderSchema.pre('validate', async function() {
  if (!this.orderNumber) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `ALV-${timestamp}-${random}`;
  }
  // No next() call needed here
});

module.exports = mongoose.model('Order', orderSchema);