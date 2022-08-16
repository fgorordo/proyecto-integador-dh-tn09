const express = require('express');
const router = express.Router();
const productsApiController = require('./../../controllers/api/productsApiController')

//localhost:3030/api/products
router.get('/', productsApiController.index)
router.get('/:id', productsApiController.detail)

module.exports = router;