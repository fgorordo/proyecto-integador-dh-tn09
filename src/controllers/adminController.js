const db = require('../database/models/index');
const { validationResult, matchedData } = require('express-validator')

const controller = {
    index: (req, res) => {
        return res.render('./adminhome');
    },
    createProduct: async (req, res) => {
        try {
            let response = await db.Category.findAll({ include: ['subCategories'] })
            let data = response.map(data => {
                return data.toJSON();
            })
            return res.render('./createProduct', { data })
        } catch (error) {
            console.log(error)
        }
    },
    listProducts: async (req, res) => {
        try {
            let { page } = req.query;
            if (page === undefined) {
                page = 0;
            }
            let response = await db.Product.findAndCountAll({ attributes: ['name', 'id', 'productImg',], limit: 10, offset: page * 10 });

            let data = response.rows.map(data => {
                return data.toJSON()
            })

            return res.render('./adminProductList.ejs', {
                data,
                page: page,
                lastPage: Math.floor(response.count / 10),
            });

        } catch (error) {
            console.log(error)
        }
    },
    newProduct: async (req, res) => {
        try {
            let validations = validationResult(req);
            if (!validations.isEmpty()) {
                let response = await db.Category.findAll({ include: ['subCategories'] })
                let data = response.map(data => {
                    return data.toJSON();
                })

                return res.render('./createProduct', {
                    errors: validations.mapped(),
                    oldData: req.body,
                    data
                })
            }

            let newProduct = matchedData(req);

            if (req.file) {
                newProduct.productImg = req.file.filename
            } else {
                newProduct.productImg = 'default.png'
            }

            if (parseInt(req.body.discount) === 0) {
                newProduct.discountValue = 0;
            }

            if (parseInt(req.body.stock) === 0) {
                newProduct.active = 0;
            }

            let response = await db.Product.create(newProduct);
            return res.redirect(`/products/detail/${response.toJSON().id}`)
        } catch (error) {
            console.log(error)
        }
    },
    editProductForm: async (req, res) => {
        try {
            let { id } = req.params;
            let response = await db.Product.findOne({ where: { id: id } })
            let data = response.toJSON();
            let categoriesResponse = await db.Category.findAll({ include: ['subCategories'] })
            let categories = categoriesResponse.map(data => {
                return data.toJSON();
            })
            res.render('./editProduct.ejs', { categories, data })
        } catch (error) {
            console.log(error)
        }
    },
    updateProduct: async (req, res) => {
        try {
            let validations = validationResult(req);
            if (!validations.isEmpty()) {
                let { id } = req.params;
                let response = await db.Product.findOne({ where: { id: id } })
                let data = response.toJSON();
                let categoriesResponse = await db.Category.findAll({ include: ['subCategories'] })
                let categories = categoriesResponse.map(data => {
                    return data.toJSON();
                })

                return res.render('./editProduct', {
                    errors: validations.mapped(),
                    oldData: req.body,
                    categories,
                    data,
                })
            }


            let response = await db.Product.findOne({where:{id:req.params.id}})
            let data = response.toJSON();
            let update = matchedData(req);

            for(let newData in update) {
                if(update[newData] !== "") {
                    data[newData] = update[newData]; 
                }
            }

            if(req.file) {
                data.productImg = req.file.filename;
            }

            await db.Product.update(data,{where:{id:req.params.id}});
            return res.redirect(`/products/detail/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            let {id} = req.params
            await db.Product.destroy({where:{id:id}})
            return res.redirect('/admin/products/list?page=0')
        } catch (error) {
            console.log(error)
        }
    },
    listUsers: async (req, res) => {
        try {
            let { page } = req.query;
            if (page === undefined) {
                page = 0;
            }
            let response = await db.User.findAndCountAll({ attributes: ['name','lastname', 'email','id', 'profileImg',], limit: 9, offset: page * 9 });

            let data = response.rows.map(data => {
                return data.toJSON()
            })

            return res.render('./adminUserList.ejs', {
                data,
                page: page,
                lastPage: Math.floor(response.count / 9),
            });

        } catch (error) {
            console.log(error)
        }
    },
    editUserForm: async (req, res) => {
        try { 
            let {id} = req.params
            let response = await db.User.findOne({where:{id:id},include:['Rol']});
            let roleResponse = await db.Role.findAll()

            let roles = roleResponse.map(rol => {
                return rol.toJSON();
            })

            let data = response.toJSON();

            return res.render('./editAccount.ejs',{oldData:data,roles})
        } catch (error) {
            console.log(error)
        }
    },
    deleteUser: async (req, res) => {
        try {

        } catch (error) {

        }
    }

}


module.exports = controller;