const fs = require('fs');
const { validationResult } = require('express-validator')
//DB
const db = require('../database/models')

const productController = {
  /* /products <GET> */
  index: async (req, res) => {
    try {
      const productsResponse = await db.Product.findAll({include:['Category', 'sbCategory']});
      const products = [];
      const categoriesResponse = await db.Category.findAll({include:['subCategories']});
      const categories = [];

      productsResponse.forEach(product => {
        products.push(product.toJSON());
      });

      categoriesResponse.forEach(category => {
        categories.push(category.toJSON())
      })

      console.log(categories[0].subCategories)
      res.render('./products/products', {products,categories});
    } catch (error) {
      console.log(error);
    }
  },


  /* /products/create <GET> */
  createProduct: async (req, res) => {
    let data = await db.Category.findAll()
    let cleanData = [];
    data.forEach(element => {
      cleanData.push(element.toJSON());
    })
    return res.render('./products/create', {
      categories: cleanData
    })
  },

  /* /products/create <POST> */
  uploadProduct: (req, res) => {
    const results = validationResult(req);
    if (results.errors.length > 0) {
      return res.render('./products/create', {
        errors: results.mapped(),
        oldData: req.body,
        categories:categories[0]
      });
    }
    let newProduct = {
      id: Date.now(),
      productName: req.body.productName,
      productCategory: req.body.productCategory,
      productSize: req.body.productSize,
      productImg: req.file.filename,
      productPrice: parseInt(req.body.productPrice),
      productDescription: req.body.productDescription
    }
    products.push(newProduct)
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'));
    res.redirect('/products')
  },

  /* /products/search <GET> */
  search: (req, res) => {
    let search = true
    let searchResults = products.filter(element => {
      return element.productName.toLowerCase().includes(req.query.keyword.toLowerCase()) === true
    })
    res.render('products/index', {
      products: searchResults,
      userSearch: req.query.keyword,
      categories: categories[0],
      search: search
    })
  },
};

module.exports = productController;  