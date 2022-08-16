const express = require('express');
const router = express.Router();
const usersApiController = require('./../../controllers/api/usersApiController');


//localhost:3030/api/users
router.get('/', usersApiController.list);
// User by ID
router.get('/:id',usersApiController.user)

module.exports = router;