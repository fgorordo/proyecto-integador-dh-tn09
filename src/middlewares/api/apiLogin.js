const jwt = require('jsonwebtoken');
const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcryptjs');
const db = require('../../database/models/index')


// Api login token
const apiLogin = async (req,res,next) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()) {
        return res.status(400).json(validation)
    }
    let {email,password}= matchedData(req);

    let match = await db.User.findOne({where:{email: email},include:['accountCart', 'Rol']});
    let user = match.toJSON()
    console.log(user)

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(403).json(
            {
                errors: [
                    {
                        value: req.body.password,
                        msg: 'Las credenciales son incorrectas',
                        param: 'password',
                        location: 'body',
                    }
                ]
            }
        );
    }
    delete user.password;
    jwt.sign({user}, 'alagrandelepusecuca',{expiresIn: '1h'}, (err, token) => {
        return res.json({
            token
        })
    })
}

module.exports = apiLogin;