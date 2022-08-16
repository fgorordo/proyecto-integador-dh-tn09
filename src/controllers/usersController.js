const db = require('../database/models/index');
const {Op} = require('sequelize')
const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcryptjs');

const usersController = {
    index: (req, res) => {
        return res.render('./login')
    },
    register: (req, res) => {
        return res.render('./register')
    },
    details: (req, res) => {
        return res.render('./account')
    },
    registerNewUser: async (req, res) => {
        try {
            let validations = validationResult(req);
            if (!validations.isEmpty()) {
                console.log(req.body)
                return res.render('./register', {
                    errors: validations.mapped(),
                    oldData: req.body,
                })
            }
            let newUser = {
                ...matchedData(req),
                profileImg: 'default.png'
            }

            delete newUser.repassword
            delete newUser.terms
            if (req.file) {
                newUser.profileImg = req.file.filename
            }

            let request = {
                ...newUser,
                password: bcrypt.hashSync(newUser.password, 10)
            }
            let createdUser = await db.User.create(request);

            delete createdUser.createdAt
            delete createdUser.deletedAt
            delete createdUser.updatedAt
            delete createdUser.password
            req.session.userLogged = createdUser;

            return res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    },
    login: async (req, res) => {
        try {
            let { email } = matchedData(req)

            let response = await db.User.findOne({ where: { email: email }, include: ['accountCart', 'Rol'] })

            let data = response.toJSON();

            delete data.password;
            delete data.createdAt;
            delete data.updatedAt;
            delete data.deletedAt;

            req.session.userLogged = data;

            if (req.body.rememberme) {
                res.cookie('token', email, { maxAge: (1000 * 60) * 60 })
            }

            return res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    },
    logout: (req, res) => {
        res.clearCookie('token');
        req.session.destroy();
        return res.redirect('/');
    },
    getCart: async (req,res) => {
        try {
            let response = await db.User.findOne({where:{id: req.session.userLogged.id},include:['accountCart']});
            let {accountCart} = response.toJSON();
            return res.render('./cart.ejs', {products:accountCart})
        } catch (error) {
            console.log(error)
        }
    },
    addToCart: async (req, res) => {
        try {
            await db.Cart.create({
                UserId: req.session.userLogged.id,
                ProductId:req.body.productId,
            })
            let response = await db.User.findOne({where:{id:req.session.userLogged.id}, include:['accountCart']});
            let data = response.toJSON();
            req.session.userLogged = data;
            return res.redirect('/users/cart');
        }catch (error) {
            console.log(error)
        }
    },
    deleteCartItem: async (req, res) => {
        try {
            await db.Cart.destroy({where:{[Op.and]: [{productId: req.body.product},{userId: req.session.userLogged.id}]}});
            let response = await db.User.findOne({where:{id:req.session.userLogged.id}, include:['accountCart']});
            let data = response.toJSON();
            req.session.userLogged = data;
            return res.redirect('/users/cart');
        } catch (error) {
            console.log(error)
        }
    },
    deleteAllCartItems: async (req, res) => {
        try {
            await db.Cart.destroy({where:{userId: req.session.userLogged.id}});
            let response = await db.User.findOne({where:{id:req.session.userLogged.id}, include:['accountCart']});
            let data = response.toJSON();
            req.session.userLogged = data;
            return res.redirect('/users/cart')
        } catch (error) {
            console.log(error)
        }
    },
    editProfile: async (req,res) => {
        try {
            let response = await db.User.findOne({where:{id:req.session.userLogged.id}})
            let data = response.toJSON();
            return res.render('./editAccount.ejs',{oldData:data})
        } catch (error) {
            console.log(error)
        }
    },
    changePasswordForm: (req,res) => {
        res.render('./changePassword.ejs')
    },
    changePassword: async (req,res) => {
        try {
            let newUserPassword = bcrypt.hashSync(req.body.password, 10);
            let userData = req.session.userLogged;
            let newUserData = {
                ...userData,
                password: newUserPassword,
            }
            let response = await db.User.update(newUserData,{where:{id:req.session.userLogged.id}})
            return res.redirect('/users/profile')
        } catch (error) {
            console.log(error)
        }
    },
    editProfileSubmit: async (req, res) => {
        try {
            let validations = validationResult(req);
            if (!validations.isEmpty()) {
                return res.render('./editAccount', {
                    errors: validations.mapped(),
                    oldData: req.body,
                })
            }
            let response = await db.User.findOne({where:{id:req.session.userLogged.id}, include:['Rol', 'accountCart']});
            let data = response.toJSON();
            let oldUserData = {
                ...data
            }

            for(let newData in matchedData(req)) {
                console.log(newData)
                if(req.body[newData] !== oldUserData.newData) {
                    oldUserData[newData] = req.body[newData]; 
                }
            }

            if (req.file) {
                oldUserData.profileImg = req.file.filename
            }

            await db.User.update(oldUserData,{where:{id: req.session.userLogged.id}})
            
            delete oldUserData.password
            delete oldUserData.deletedAt
            delete oldUserData.updatedAt
            delete oldUserData.createdAt
            
            req.session.userLogged = oldUserData;
            return res.redirect('/users/profile');
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = usersController;