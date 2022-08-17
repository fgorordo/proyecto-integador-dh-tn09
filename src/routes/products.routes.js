const express = require('express');
const router = express.Router();
const productsController = require('./../controllers/productsController.js');

//localhost:3030/
router.get('/', productsController.main);
router.get('/detail/:id', productsController.detail);
router.get('/create', productsController.create);
router.get('/search?', productsController.findBy);

module.exports = router;