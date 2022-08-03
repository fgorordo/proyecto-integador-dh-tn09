const db = require("../database/models");

const MainController = {
    home: (req, res) => {
        db.Product.findAll({ limit: 5 })
        .then(data => {
            let cleanData = [];
            data.forEach(element => {
                cleanData.push(element.toJSON())
            })

            return res.render('home', { data: cleanData })
        })
        .catch(error => {
            console.log(error)
        })
    }
}



module.exports = MainController;