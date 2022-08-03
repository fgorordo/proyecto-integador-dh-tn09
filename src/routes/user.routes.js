const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');
const guestMiddleware = require('../middlewares/guestMiddleware');
const loginCheckMiddleware = require('../middlewares/loginCheckMiddleware')
const userValidations = require('../middlewares/userValidations')

/* Multer Settings */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/uploads/users');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, req.params.id + '-userAvatar' + ext);
  },
});

/* Multer Env */
const upload = multer({ storage });


/* Login */
router.get('/login', guestMiddleware, UsersController.login);
router.post('/login',userValidations.login , UsersController.loginValidation);

/* Logout */
router.get('/logout', UsersController.logout)
/* Register */
router.get('/register',guestMiddleware ,UsersController.register);
router.post('/register',upload.single('avatar'), userValidations.register ,UsersController.create);

/* Profile */
router.get('/profile/', loginCheckMiddleware, UsersController.profile);

/* Profile: edit info */
router.put('/update/:id',upload.single('profileImg'), UsersController.updateProfile)


router.get('/logout', UsersController.logout);


module.exports = router;