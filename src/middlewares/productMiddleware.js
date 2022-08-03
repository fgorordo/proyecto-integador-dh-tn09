const { body } = require('express-validator');
const validations = [
    body('name')
    .trim()
    .notEmpty().bail().withMessage('Debes ingresar un nombre.')
    .isLength({min:5}).withMessage('Este campo debe terner como minimo 5 carecteres'),

    body('price')
    .trim()
    .notEmpty().bail().withMessage('Debes ingresar un nombre.')
    .isDecimal().withMessage('Este campo solo acepta numeros enteros o decimales'),

    body('discountValue')
    .trim()
    .notEmpty().bail().withMessage('Debes ingresar un nombre.')
    .isNumeric().withMessage('Este campo solo acepta numeros'),

    body('stock')
    .trim()
    .notEmpty().bail().withMessage('Debes ingresar un nombre.')
    .isNumeric().withMessage('Este campo solo acepta numeros'),

    body('categoryId')
    .trim()
    .notEmpty().bail().withMessage('Debes seleccionar una categoria.'),

    body('sbCategoryId')
    .trim()
    .notEmpty().bail().withMessage('Debes seleccionar una sub-categoria.'),

    body('description')
    .trim()
    .isLength({min:20}).withMessage('Este campo debe terner como minimo 5 carecteres'),
]

module.exports = validations