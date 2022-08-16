const { body } = require('express-validator');
const db = require('../database/models');

const validations = [
        body('email')
            .trim()
            .notEmpty().bail().withMessage('Este campo no puede estar vacio')
            .isEmail().bail().withMessage('Debes ingresar un formato de mail valido')
            .normalizeEmail(),
        body('password')
            .trim()
            .notEmpty().bail().withMessage('Este campo no puede estar vacio'),
        body('email')
            .trim()
            .custom((value, { req }) => {
                return db.User.findOne({ where: { email: req.body.email } })
                    .then(emailExists => {
                        if (!emailExists) {
                            return Promise.reject();
                        }
                        return true;
                    });
            }).bail().withMessage('Las credenciales son incorrectas'),

    ]

module.exports = validations;