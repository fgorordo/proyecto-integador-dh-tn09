const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const usersRouter = require('./users.routes');
const productsRouter = require('./products.routes');
const adminRouter = require('./admin.routes');

//localhost:3030/
router.get('/', indexController.index);
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/admin', adminRouter);

module.exports = router;