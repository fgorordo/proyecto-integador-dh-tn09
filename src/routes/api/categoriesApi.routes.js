const express = require('express');
const router = express.Router();
const productsApiController = require('./../../controllers/api/productsApiController')

//localhost:3030/api/categories
router.get('/', productsApiController.categories)
router.get('/:categoryId', productsApiController.filter)

module.exports = router;