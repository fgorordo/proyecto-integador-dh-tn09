const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const usersController = require('../controllers/usersController');
const registerValidations = require('../middlewares/registerFormValidations')
const loginValidations = require('../middlewares/loginValidations')
const loginUser = require('../middlewares/loginUser')
const notGuestMiddleware = require('../middlewares/notGuestMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')
const editInfoValidations = require('../middlewares/editInfoValidations')
const validateUserPassword = require('../middlewares/validateUserPassword')

/* Multer Settings */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/uploads/users');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + '-userAvatar' + ext);
    },
});

const fileFilter = (req, file , cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null,true)
    }else {
        // reject the file
        cb(null, false)
    }
}

/* Multer Env */
const upload = multer({ 
    storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter,
});

//localhost:3030/
router.get('/login', notGuestMiddleware,usersController.index);
router.post('/login', loginValidations,loginUser,usersController.login);
router.get('/register',notGuestMiddleware, usersController.register)
router.post('/register', upload.single('profileImg'),registerValidations, usersController.registerNewUser)
router.get('/logout', usersController.logout)
router.get('/profile', guestMiddleware,)
router.get('/cart',guestMiddleware, usersController.getCart)
router.post('/cart/add', guestMiddleware, usersController.addToCart)
router.post('/cart/deleteitem', guestMiddleware, usersController.deleteCartItem)
router.post('/cart/deleteall', guestMiddleware, usersController.deleteAllCartItems)
router.get('/profile', guestMiddleware, usersController.details)
router.get('/profile/edit', guestMiddleware,usersController.editProfile)
router.patch('/profile/edit', guestMiddleware,upload.single('profileImg'),editInfoValidations,usersController.editProfileSubmit)
router.get('/profile/security', guestMiddleware,usersController.changePasswordForm)
router.patch('/profile/security', guestMiddleware,validateUserPassword,usersController.changePassword)
module.exports = router;