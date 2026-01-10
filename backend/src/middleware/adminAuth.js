// middleware/adminAuth.js

/**
 * Middleware to restrict access to Admins only
 * Assumes 'req.user' is populated by a previous auth middleware
 */
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); // User is admin, proceed to the controller
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Administrator privileges required.'
      });
    }
  };
  
  module.exports = isAdmin;