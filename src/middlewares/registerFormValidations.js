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
            .notEmpty().bail().withMessage('Este campo no puede estar vacio')
            .isLength({ min: 8, max: 16 }).bail().withMessage('La contraseña debe tener de 8 a 16 caracteres, contener como minimo una mayúscula, una minúscula, un número y un caracter especial')
            .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).bail().withMessage('La contraseña debe tener de 8 a 16 caracteres, contener como minimo una mayúscula, una minúscula, un número y un caracter especial'),
        body('repassword')
            .trim()
            .notEmpty().bail().withMessage('Este campo no puede estar vacio')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    return Promise.rejected()
                }
                return true;
            }).bail().withMessage('Ambas contraseñas deben ser identicas'),
        body('name')
            .trim()
            .notEmpty().bail().withMessage('Este campo no puede estar vacio')
            .isAlpha().bail().withMessage('No se permiten simbolos, números o caracteres especiales'),
        body('lastname')
            .trim()
            .notEmpty().bail().withMessage('Este campo no puede estar vacio')
            .isAlpha().bail().withMessage('No se permiten simbolos, números o caracteres especiales'),
        body('email')
            .trim()
            .custom((value, { req }) => {
                return db.User.findOne({ where: { email: req.body.email } })
                    .then(emailExists => {
                        if (emailExists) {
                            return Promise.reject();
                        }
                        return true;
                    });
            }).bail().withMessage('Este email ya se encuentra registrado'),
        body('phone','Solo se aceptan números en este campo')
        .trim()
        .if(body('phone').notEmpty())
        .isNumeric().bail(),

    ]

module.exports = validations;