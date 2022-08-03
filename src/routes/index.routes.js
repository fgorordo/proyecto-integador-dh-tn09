const express = require ('express');
const router = express.Router();
const indexController = require ('../controllers/indexController');
const productsRouter = require('./products.routes')
const usersRouter = require('./user.routes')
const adminRouter = require('./admin.routes')


// HOME //
router.get('/', indexController.home);

router.use('/products',productsRouter)
router.use('/users', usersRouter)
router.use('/admin', adminRouter)

// 404 si la ruta no existe

module.exports = router;