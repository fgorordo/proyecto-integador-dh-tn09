const {body} = require('express-validator');
const db = require('../../database/models/index');

const loginValidations = [
    /* Login > Comprueba formato de email */
    body('email')
    .trim()
    .notEmpty().bail().withMessage('Debes ingresar un email.')
    .isEmail().bail().withMessage('Debe ser un formato de mail válido.')
    .normalizeEmail(),

    /* Login > Revisa si el email existe*/
    body('email')
    .custom(async (value, {req,res}) => {
        try {
            let emailExist = await db.User.findOne({where:{email: req.body.email}})
            if (!emailExist) {
                return Promise.reject('El email ingresado no se encuentra registrado')
            } else {
                return true;
            }
        } catch (error) {
            res.json(error)
            return res.staus(200)
        }
    }),
    /* Login > Comprueba formato de contraseña*/
    body('password')
    .trim()
    .notEmpty().bail().withMessage('Debes ingresar una contraseña'),
];

module.exports = loginValidations;