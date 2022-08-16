const { body } = require('express-validator');
const db = require('../database/models');

const validations = [
        body('email')
            .trim()
            .notEmpty().bail().withMessage('Este campo no puede estar vacio')
            .isEmail().bail().withMessage('Debes ingresar un formato de mail valido')
            .normalizeEmail(),
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
        body('country')
            .trim()
            .if(body('country').notEmpty())
            .isAlpha().bail().withMessage('No se permiten simbolos, números o caracteres especiales'),
        body('state')
            .trim()
            .if(body('state').notEmpty())
            .isAlphanumeric().bail().withMessage('No se permiten simbolos o caracteres especiales'),
        body('city')
            .trim()
            .if(body('city').notEmpty())
            .isAlphanumeric().bail().withMessage('No se permiten simbolos o caracteres especiales'),
        body('zipcode')
            .trim()
            .if(body('zipcode').notEmpty())
            .isAlphanumeric().bail().withMessage('No se permiten simbolos o caracteres especiales'),
        body('zipcode')
            .trim()
            .if(body('zipcode').notEmpty())
            .isAlphanumeric().bail().withMessage('No se permiten simbolos o caracteres especiales'),
        body('address')
            .trim()
            .if(body('address').notEmpty())
            .isAlphanumeric().bail().withMessage('No se permiten simbolos o caracteres especiales'),

    ]

module.exports = validations;