// routes/admin.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Your existing auth guard
const isAdmin = require('../middleware/adminAuth');
const {
    getDashboardStats,
    getAllOrders,
    updateOrderStatus,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllUsers
  } = require('../controllers/adminController');
  
  router.use(protect, isAdmin);
  
  // Dashboard
  router.get('/stats', getDashboardStats);
  
  // Orders
  router.get('/orders', getAllOrders);
  router.patch('/orders/:id/status', updateOrderStatus);
  
  // Products
  router.get('/products', getAllProducts);
  router.post('/products', createProduct);
  router.put('/products/:id', updateProduct);
  router.delete('/products/:id', deleteProduct);
  
  // Users
  router.get('/users', getAllUsers);
  
  module.exports = router;