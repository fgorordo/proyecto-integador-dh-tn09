const db = require('../../database/models/index');

const productsApiController = {
    index: async (req, res) => {
        try {
            let allProducts = await db.Product.findAll({ include: ['Category', 'sbCategory'] })
            let categories = await db.Category.findAll({ include: ['Products'] })
            let response = categories.map(category => (
                {
                    ...category.toJSON(),
                    Products: category.Products.length,
                }
            ))

            let productsUrlImgJSON = allProducts.map(product => {
                return product.toJSON();
            })

            let productsResponse = productsUrlImgJSON.map(product => {
                return {
                    ...product,
                    productImg: product.productImg = `${product.productImg}`,
                }
            })
            return res.status(200).json({
                count: allProducts.length,
                countByCategory: response,
                products: productsResponse,
            });
        } catch (error) {
            return res.status(500).json(error)
        }

    },
    categories: async (req, res) => {
        try {
            let categories = await db.Category.findAll({ include: ['subCategories'] });
            let response = categories.map(category => (
                {
                    ...category.toJSON(),
                }
            ))


            return res.status(200).json({
                count: response.length,
                categories: response,
            })

        } catch (error) {
            console.log(error)
        }
    },
    detail: async (req, res) => {
        try {
            let product = await db.Product.findOne({ where: { id: req.params.id } })
            let productWhitUrl = {
                ...product.toJSON(),
                productImg: product.productImg = `${product.productImg}`,
            }
            return res.status(200).json(productWhitUrl)
        } catch (error) {
            console.log(error)
        }
    },
    filter: async (req, res) => {
        try {
            let { categoryId } = req.params
            let products = await db.Product.findAll({where: {categoryId: categoryId}})
            return res.status(200).json(products)
        } catch (error) {

        }
    }
}

module.exports = productsApiController;
