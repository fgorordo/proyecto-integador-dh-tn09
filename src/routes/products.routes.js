const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//localhost:3030/
router.get('/', productsController.index);
router.get('/detail/:id', productsController.detail);
router.get('/create', productsController.create);
router.get('/search?', productsController.findBy);

module.exports = router;