const db = require('../database/models/index');
const { Op } = require("sequelize");

const productsController = {
    main: (req, res) => {
        return res.send('Hello world')
    },
    detail: async (req, res) => {
        try {
            let response = await db.Product.findOne({ where: { id: req.params.id }, include: ['sbCategory', 'Category'] });
            let data = response.toJSON();
            console.log(data)
            return res.render('./productDetails.ejs', { product: data })
        } catch (error) {
            console.log(error)
        }
    },
    create: async (req, res) => {
        try {
            let response = await db.Category.findAll({ include: ['subCategories'] });
            let data = response.map(data => {
                return data.toJSON();
            })
            return res.render('./createProduct.ejs', {
                categories: data,
            })
        } catch (error) {
            console.log(error)
        }

    },
    findBy: async (req, res) => {
        try {    
            let { filter, page } = req.query;
            if(page === undefined) {
                page = 0;
            }


            let response = null;
            switch (filter) {
                case 'muebles':
                    response = await db.Product.findAndCountAll({ where: { categoryId: '1' }, include: ['Category', 'sbCategory'], limit: 9, offset: page * 9 });
                    break;
                case 'accesorios':
                    response = await db.Product.findAndCountAll({ where: { categoryId: '3' }, include: ['Category', 'sbCategory'], limit: 9, offset: page * 9 });
                    break;
                case 'iluminacion':
                    response = await db.Product.findAndCountAll({ where: { categoryId: '2' }, include: ['Category', 'sbCategory'], limit: 9, offset: page * 9 });
                    break;
                case 'all':
                    response = await db.Product.findAndCountAll({ include: ['Category', 'sbCategory'], limit: 9, offset: page * 9 });
                    break;
                case 'ofertas':
                    response = await db.Product.findAndCountAll({ where: { discount: '1' }, include: ['Category', 'sbCategory'], limit: 9, offset: page * 9 });
                    break;
                default:
                    response = await db.Product.findAndCountAll({ where:{name: {[Op.like]: `%${filter}%`}}, include: ['Category', 'sbCategory'], limit:9, offset: page * 9});
                    break;
            }
            let data = response.rows.map(data => {
                return data.toJSON();
            })


            return res.render('./products.ejs', {
                products: data,
                page: page,
                lastPage: response.count / 9,
                filterBy: filter,
            });
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = productsController;