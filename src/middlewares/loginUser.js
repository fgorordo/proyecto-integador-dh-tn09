const db = require('../database/models/index');
const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcryptjs');

const loginUser = async (req, res, next) => {
    try {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            return res.render('./login', {
                errors: validation.mapped(),
                oldData: req.body,
            })
        }
        const {email,password} = matchedData(req);
        let userToLogin = await db.User.findOne({where:{email: email}})
        let response = userToLogin.toJSON()
        if(bcrypt.compareSync(password, response.password)) {
            next()
        } else {
            return res.render('./login', {
                oldData: req.body,
                errors:{
                    email: {
                        value: req.body.email,
                        msg: 'Las credenciales son incorrectas'
                    }
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = loginUser;