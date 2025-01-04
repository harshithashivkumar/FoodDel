const express = require('express');
const orderRouter = express.Router();   
const { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

// Place a new order
orderRouter.post('/place', authMiddleware, placeOrder);

// Verify payment for an order
orderRouter.post('/verify', verifyOrder);

// List all orders (Admin)
orderRouter.get('/list', listOrders);

// Get orders for a specific user
orderRouter.post('/userOrders', authMiddleware, userOrders);

// Update the status of an order
orderRouter.post('/status', updateStatus);

module.exports = orderRouter;