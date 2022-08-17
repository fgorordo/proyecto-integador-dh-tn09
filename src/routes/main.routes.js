const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const usersRouter = require('./users.routes');
const productsRouter = require('./products.routes');
const adminRouter = require('./admin.routes');

//localhost:3030/
router.get('/', mainController.main);
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/admin', adminRouter);

module.exports = router;