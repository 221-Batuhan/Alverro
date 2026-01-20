const express = require('express');
const router = express.Router();

// FIX 1: Correct import path (was pointing to non-existent authMiddleware)
const { protect } = require('../middleware/auth'); 
const isAdmin = require('../middleware/adminAuth');

// Import Admin Stats
const {
    getDashboardStats,
    getAllOrders,
    updateOrderStatus,
    getAllUsers
} = require('../controllers/adminController');

// FIX 2: Import Product functions from productController (NOT adminController)
const {
    getProducts: getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
  
// Apply protection to all routes below
router.use(protect, isAdmin);
  
// Dashboard Stats
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