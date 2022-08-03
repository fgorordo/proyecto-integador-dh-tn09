const { validationResult } = require('express-validator')
const db = require('../database/models');
//DB

const controller = {
  index: async (req, res) => {
    try {
      let user = await db.Product.findAll()
      let cleanData = []
      user.forEach(element => {
        cleanData.push(element.toJSON());
      })

      return res.render('./users/admin/adminPanel', { products: cleanData })

    } catch (error) {
      console.log(error)
    }
  },

  createProduct: async (req, res) => {
    try {
      let results = validationResult(req)
      if (!results.isEmpty()) {
        return res.render('./admin/products/create', {
          errors: results.mapped(),
          data: req.body,
        })
      }

      let newProduct = {
        ...req.body,
        productImg : req.file ? req.file.filename : 'default.jpg',
        discount: req.body.discountValue > 0 ? true : false,
        discountValue: req.body.discountValue ? req.body.discountValue : 0,
      }

      await db.Product.create({
        ...newProduct,
      })

      res.redirect('/admin/dashboard')
    } catch (err) {
      console.log(err)
    }
  },

  createProductForm: async (req, res) => {
    try {
      let data = await db.Category.findAll({include: ['subCategories']})
      let cleanData = [];
      data.forEach(element => {
        cleanData.push(element.toJSON());
      })
      return res.render('./admin/createproduct', {
        categories: cleanData,
      })

    } catch (error) {
      console.log(error)
    }
  },

  editProductForm: async (req, res) => {
    try {

      let data = await db.Category.findAll()
      let productoData = await db.Product.findOne({ where: { id: req.params.id }, includes: ['Category'] })
      let cleanData = [];
      let cleanProductData = productoData.toJSON()
      data.forEach(element => {
        cleanData.push(element.toJSON());
      })

      return res.render('./products/edit', {
        categories: cleanData,
        product: cleanProductData,
      })

    } catch (error) {
      console.log(error)
    }
  },

  editProductUpdate: async (req, res) => {
    try {
      let data = await db.Product.findOne({ where: { id: req.params.id }, includes: ['Category'] })
      let oldData = data.toJSON()

      let updatedData = {
        ...oldData,
        ...req.body,
        productImg: req.file ? req.file.filename : "",
      }

      await db.Product.update(
        updatedData,
        { where: { id: parseInt(req.params.id) } }
      )
      return res.redirect('/admin/dashboard')
    } catch (error) {
      console.log(error)
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await db.Product.destroy({ where: { id: req.params.id } })
      res.redirect('/admin/dashboard')
    } catch (error) {
      console.log(error)
    }
  },

  manageUsers: async (req, res) => {
    try{
      let user = await db.User.findAll({ include: ['Rol'] })
      let cleanData = []
      user.forEach(element => {
        cleanData.push(element.toJSON());
      })

      return res.render('./users/admin/usersDashboard', { users: cleanData })
    } catch (error) {
      console.log(error)
    }
  },

  editUser: async (req, res) => {
    try {
      let data = await db.User.findOne({where:{id: req.params.id}, include:['Rol']});
      let rolData = await db.Role.findAll()
      let rolCleanData = [];
      rolData.forEach(element => {
        rolCleanData.push(element.toJSON())
      })
      let cleanData = data.toJSON();
      res.render('./users/admin/editUser',{user: cleanData, roles:rolCleanData});
    } catch (error) {
      console.log(error)
    }
  },

  uploadInfo: async (req, res) => {
    try {
      let data = await db.User.findOne({ where: { id: req.params.id }, includes: ['Rol'] })
      let oldData = data.toJSON()
      console.log(req.file)
      let updatedData = {
        ...oldData,
        ...req.body,
        profileImg: 'default.jpg' //Acomodar multer
      }
      await db.User.update(
        updatedData,
        { where: { id: parseInt(req.params.id) } }
      )
      return res.redirect('/admin/dashboard/users')
    } catch (error) {
      console.log(error)
    }
  },

  deleteUser: async (req, res) => {
      try {
        await db.User.destroy({ where: { id: req.params.id } })
        res.redirect('/admin/dashboard/users')
      } catch (error) {
        console.log(error)
      }
  },

  manageCategories: async (req,res) => {
    try {
      let data = await db.Category.findAll()
      let cleanData = []
      data.forEach(element => {
        cleanData.push(element.toJSON())
      })
      res.render('./users/admin/categoriesDashboard', {categories: cleanData})
    } catch (error) {
      console.log(error)
    }
  },
  
  addCategory: async (req, res) => {
    try {
      await db.Category.create({
        ...req.body
      })
      res.redirect('/admin/dashboard/categories')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = controller;