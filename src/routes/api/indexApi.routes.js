const express = require ('express');
const router = express.Router();
const productsApiRouter = require('./productsApi.routes')
const usersApiRouter = require('./usersApi.routes')
const categoriesApiRouter = require('./categoriesApi.routes')
const apiController = require('../../controllers/api/apiController')


// Entry point
// localhost:3030/api (No existe ruta para localhost:3030/api)
// Solo existen rutas para (localhost:3030/api/products)
// Solo existen rutas para (localhost:3030/api/users)
router.use('/api/users', usersApiRouter)
router.use('/api/products', productsApiRouter)
router.use('/api/categories', categoriesApiRouter)
router.get('/api/info', apiController.info)

module.exports = router;