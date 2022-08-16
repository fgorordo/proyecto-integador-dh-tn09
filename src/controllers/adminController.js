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
    listProducts: (req, res) => {

    },
    newProduct: async (req, res) => {
        try {
            let validations = validationResult(req);
            if (!validations.isEmpty()) {
                let response = await db.Category.findAll({ include: ['subCategories'] })
                let data = response.map(data => {
                    return data.toJSON();
                })
                console.log(validations)
                console.log(req.body.category)
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

            if(parseInt(req.body.discount) === 0) {
                newProduct.discountValue = 0;
            }

            if(parseInt(req.body.stock) === 0) {
                newProduct.active = 0;
            }

            let response = await db.Product.create(newProduct);
            return res.redirect(`/products/detail/${response.toJSON().id}`)
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = controller;