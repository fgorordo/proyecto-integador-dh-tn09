const db = require('../database/models/index')

async function autoLogin(req, res, next) {
  try {
    res.locals.isLogged = false;
    if (!req.session.userLogged && req.cookies.token) {
      let userToLogin = await db.User.findOne({ where: { email: req.cookies.token } })
      delete data.password;
      delete data.createdAt;
      delete data.updatedAt;
      delete data.deletedAt;
      req.session.userLogged = userToLogin.dataValues
    }

    if (req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged
    }

    next();
  } catch (errors) {
    console.log(errors)
  }
}

module.exports = autoLogin