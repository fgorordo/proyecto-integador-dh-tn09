const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController.js');
const usersRouter = require('./users.routes.js');
const productsRouter = require('./products.routes.js');
const adminRouter = require('./admin.routes.js');

//localhost:3030/
router.get('/', indexController.index);
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/admin', adminRouter);

module.exports = router;