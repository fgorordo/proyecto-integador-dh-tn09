const db = require('../database/models/index');
const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcryptjs');

const validateUserPassword = async (req, res, next) => {
    try {
        let validations = validationResult(req);
        if (!validations.isEmpty()) {
            return res.render('./changePassword', {
                errors: validations.mapped(),
            })
        }

        let oldUserPassword = await db.User.findOne({where:{id:req.session.userLogged.id},attributes: ['password']});
        
        if(bcrypt.compareSync(req.body.oldPassword,oldUserPassword.password)) {
            return next();
        } else {
            return res.render('./changePassword', {
                errors: {
                    oldPassword: {
                        msg: 'La contraseña actual no es correcta'
                    }
                }
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = validateUserPassword;