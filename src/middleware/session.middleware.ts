const models = require('../../db/models')

module.exports = {
  auth: {
    require: (url) => {
      return (req, res, next) => {
        if(!req.session.user) {
          res.redirect(url)
        } else {
          return next()
        }
      }
    },
    redirect: (url) => {
      return (req, res, next) => {
        if(req.session && req.session.user) {
          res.redirect(url)
        } else {
          return next()
        }
      }
    },
    ajax: (req, res, next) => {
      if (req.xhr) {
        next()
      } else {
        res.status(400).end('400 Bad Request')
      }
    }
  },
  save: (req, res, next) => {
    return models.User.findOne({
      where: {'userName': req.body.userName}, 
      attributes: ['id', 'userName']
    }).then(user => {
      req.session.user = user
      return next()
    })
  },
  destroy: (req, res, next) => {
    if(req.session && req.session.user) {
      req.session.destroy((error) => {
        return next()
      });
    } else {
      return next()
    }
  }
}