const express = require('express');
const cartRouter = express.Router();
const authMiddlware = require('../middleware/auth');


const {addToCart, getCart, removeFromCart }= require('../controllers/cartController');
const { verifyOrder } = require('../controllers/orderController');

cartRouter.post('/add',authMiddlware, addToCart);
cartRouter.post('/get',authMiddlware, getCart);
cartRouter.post('/remove',authMiddlware, removeFromCart);


module.exports = cartRouter;