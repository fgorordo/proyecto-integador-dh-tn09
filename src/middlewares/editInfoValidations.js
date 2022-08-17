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
            .notEmpty().bail().withMessage('Este campo no puede estar vacío')
            .isLength({min:3}).bail().withMessage('El nombre debe tener como minimo 3 caracteres'),
        body('lastname')
            .trim()
            .notEmpty().bail().withMessage('Este campo no puede estar vacio'),
        body('phone','Solo se aceptan números en este campo')
            .trim()
            .if(body('phone').notEmpty())
            .isNumeric().bail(),
        body('country')
            .trim()
            .if(body('country').notEmpty()),
        body('state')
            .trim()
            .if(body('state').notEmpty()),
        body('city')
            .trim()
            .if(body('city').notEmpty())
            .isAlphanumeric().bail().withMessage('No se permiten simbolos o caracteres especiales'),
        body('zipcode')
            .trim()
            .if(body('zipcode').notEmpty())
            .isAlphanumeric().bail().withMessage('No se permiten simbolos o caracteres especiales'),
        body('address')
            .trim()
            .if(body('address').notEmpty())

    ]

module.exports = validations;