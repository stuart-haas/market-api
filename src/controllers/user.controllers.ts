const models = require('../../db/models')

module.exports = {
  register: {
    post: (req, res, next) => {
      models.User.create(
        req.body
      ).then((user) => {
        res.redirect('/users/login')
      }).catch((error) => {
        console.log(error)
      })
    },
    get: (req, res, next) => {
      res.render('pages/user/register')
    }
  },
  login: {
    post: (req, res, next) => {
      res.redirect('/dashboard')
    },
    get: (req, res, next) => {
      res.render('pages/user/login')
    }
  },
  logout: (req, res, next) => {
    res.redirect('/users/login')
  }
}