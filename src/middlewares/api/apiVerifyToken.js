const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    if (!req.headers.token) {
        return res.status(403).json(
            {
                value: '',
                msg: 'No existe token por favor inicia sesión',
                params: 'token',
                location: 'header'

            }
        )
    }
    jwt.verify(req.headers.token, 'alagrandelepusecuca', (error, token) => {
        if (error) {
            return res.status(403).json(
                {
                    value: req.headers.token,
                    msg: 'La sesión ha caducado, por favor vuelva a iniciar sesión',
                    params: 'token',
                    location: 'headers'
                }
            )
        } else {
            if( token.user.Rol.name === 'Administrador') {
                return next()
            } else {
                return res.status(403).json(
                    {
                        value: token.user.Rol.name,
                        msg: 'No posees los permisos suficientes para continuar',
                        params: 'token',
                        location: 'headers',
                    }
                )
            }
        }
    })
}

module.exports = verifyToken;