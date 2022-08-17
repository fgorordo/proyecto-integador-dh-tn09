const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/adminController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const createProductValidations = require('../middlewares/createProductValidations');


/* Multer Settings */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/uploads/products');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + '-productImg' + ext);
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

//localhost:3030/admin
router.get('/', guestMiddleware,isAdmin, adminController.index);
router.get('/products/create', guestMiddleware, isAdmin, adminController.createProduct)
router.post('/products/create', guestMiddleware, isAdmin, upload.single('productImg'),createProductValidations, adminController.newProduct)
router.get('/products/list', guestMiddleware, isAdmin, adminController.listProducts)
router.get('/products/edit/:id', guestMiddleware, isAdmin, adminController.editProductForm)
router.put('/products/edit/:id', guestMiddleware, isAdmin,upload.single('productImg'),createProductValidations, adminController.updateProduct)
router.delete('/products/delete/:id', guestMiddleware, isAdmin, adminController.deleteProduct);
router.get('/users/list', guestMiddleware, isAdmin, adminController.listUsers);
router.get('/users/edit/:id', guestMiddleware, isAdmin, adminController.editUserForm);
router.delete('/users/delete/:id', guestMiddleware, isAdmin, adminController.deleteUser);


module.exports = router;