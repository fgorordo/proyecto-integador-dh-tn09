const db = require('../../database/models/index');
const bcrypt = require('bcryptjs');
const { validationResult, matchedData } = require('express-validator')

const usersApiController = {
    login: ( req, res ) => {
        return res.status(200).json('Login exitoso')
    },
    index: (req, res) => {
        return res.send('Hello world').json();
    },
    list: async (req, res) => {
        try {
            let data = await db.User.findAll({attributes: ['id','name','email','profileImg','lastname']});

            let userList = data.map(user => (
                {
                    ...user.toJSON(),
                    detail: `https://zen-hogar.herokuapp.com/api/user/${user.id}`
                }
            ));


            if (!userList) {
                return res.status(404).send('No se encontro el recurso');
            }


            return res.status(200).json({
                count: userList.length,
                users: userList,
            });
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    create: async (req, res) => {
        try {
            let userRegisterData = req.body;
            if (req.file) {
                userRegisterData.profileImg = `http://localhost:3030/users/avatar/${req.file.filename}`;
            }
            userRegisterData.password = bcrypt.hashSync(userRegisterData.password,10);

            let newUser = await db.User.create(userRegisterData);

            return res.status(200).json({
                msg: 'La cuenta se ha registrado con exito',
                data: newUser
            })

        } catch (err) {
            return res.status(500).json(err)
        }
    },
    update: async (req, res) => {
        try {
            let validations = validationResult(req);
            if (!validations.isEmpty()) {
                return res.status(400).json(validations)
            }

            let userData = await db.User.findOne({ where: { id: req.params.id }, include: ['accountCart'] });
            let newUserData = {
                ...userData.toJSON(),
            }
            
            for(let newData in req.body) {
                if(req.body[newData] !== "") {
                    newUserData[newData] = req.body[newData]; 
                }
            }

            if (req.file) {
                newUserData.profileImg = `http://localhost:3030/users/avatar/${req.file.filename}`;
            }
            let updatedUser = await db.User.update(newUserData, {where: {id: req.params.id}});

            delete newUserData.password;

            if (updatedUser) {
                return res.status(200).json(
                    {
                        value: req.params.id,
                        msg: "Los cambios se realizaron con exito",
                        data: newUserData
                    }
                )
            } else {
                return res.status(500).json( {
                    value: 0,
                    msg: 'Algo sucedio al intentar actualizar tu información, por favor reporta este error a flgorodo@gmail.com',
                    params: 'PATCH',
                    location: 'http'
                })
            }

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        try {
            let deletedUser = await db.User.destroy({where: {id: req.params.id}});
            return res.status(200).json({
                value: req.params.id,
                msg: 'La cuenta ha sido borrada exitosamente',
                params: 'DELETE',
                locations:'http'
            });
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    user: async (req, res) => {
        try {
            let myData = await db.User.findOne({where: {id: req.params.id}, include: ['accountCart', 'Rol']})
            return res.status(200).json(
                {   ...myData.dataValues,
                }
            );
        } catch (error) {
            return res.status(500).json(error)
        };
    }
}

module.exports = usersApiController;