const db = require('../database/models/index');

const indexController = {
    index: async (req, res) => {
        try {
            let getRandomElementIndex = (array) => {
                let random = Math.random() * array.length;
                return Math.floor(random)
            }
            let response = await db.Product.findAll()
            let data = response.map(data => {
                return data.toJSON()
            })
            
            let sortData = [];

            for(let i = 0; i < 12; i++) {
                sortData.push(data[getRandomElementIndex(data)])
            }

            return res.render('./home.ejs', {products: sortData})
        } catch (error) {
            console.log(error)
        }
        
    },
}

module.exports = indexController;