const { body } = require('express-validator');
const db = require('../database/models');

const validations = [
    body('name')
        .trim()
        .notEmpty().bail().withMessage('Este campo no puede estar vacío')
        .isAlphanumeric('es-ES', { ignore: ' ' }).bail().withMessage('No se permiten simbolos o caracteres especiales'),
    body('price')
        .trim()
        .notEmpty().bail().withMessage('Este campo no puede estar vacío')
        .isInt({min:1}).bail().withMessage('Solo se permiten números positivos en este campo'),
    body('stock')
        .trim()
        .notEmpty().bail().withMessage('Este campo no puede estar vacío')
        .isInt().bail().withMessage('Solo se permiten números en este campo'),
    body('categoryId')
        .trim()
        .notEmpty().bail().withMessage('Debes seleccionar una categoria'),
    body('sbCategoryId')
        .trim()
        .notEmpty().bail().withMessage('Debes seleccionar una categoria'),
    body('discount')
        .trim()
        .isBoolean().bail().withMessage('Solo se aceptan valores lógicos (Si / No)'),
    body('discountValue')
        .trim()
        .notEmpty().bail().withMessage('Este campo no puede estar vacío')
        .isInt({min:0, max:99}).bail().withMessage('Solo se permiten números positivos entre 0 y 99 en este campo'),
    body('description')
        .trim()
        .notEmpty().bail().withMessage('Este campo no puede estar vacío')
        .isLength({min:20,max:9999}).bail().withMessage('La descripción debe tener como mínimo 5 caracteres')
]

module.exports = validations;