const db = require('../../database/models/index')
const apiController = {
    info: async (req, res) => {
        try {
            let productsInfo = await db.Product.findAll()
            let productInfoCount = productsInfo.map(product => {
                return product.toJSON();
            })

            let usersInfo = await db.User.findAll();
            let userInfoCount = usersInfo.map(user => {
                return user.toJSON();
            })

            let productsByCategory = await db.Category.findAll({include:['Products','subCategories']})
            let productsByCategoryCount = productsByCategory.map(product => {
                return product.toJSON();
            })

            console.log(productsByCategoryCount)
            res.status(200).json({
                totalProducts: productInfoCount.length,
                totalUsers: userInfoCount.length,
                totalProductsByCategory: {
                    muebles: productsByCategoryCount[0].Products.length,
                    iluminacion: productsByCategoryCount[1].Products.length,
                    accesorios: productsByCategoryCount[2].Products.length,
                },
                totalSubCategories: {
                    muebles: productsByCategoryCount[0].subCategories.length,
                    iluminacion: productsByCategoryCount[1].subCategories.length,
                    accesorios: productsByCategoryCount[2].subCategories.length,
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = apiController