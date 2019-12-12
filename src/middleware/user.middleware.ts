const models = require('../../db/models')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

module.exports = { 
  validation: {
    register: [
      check('userName', 'Your username must have more than 5 characters').exists().isLength({min: 5}).trim().escape().custom(value => {
        return models.User.findOne({where: {'userName': value}}).then(user => {
          if (user) {
            return Promise.reject('Username already exists')
          }
        })
      }),
      check('email', 'Your email is not valid').exists().trim().escape().isEmail().custom(value => {
        return models.User.findOne({where: {'email': value}}).then(user => {
          if (user) {
            return Promise.reject('Email already exists')
          }
        })
      }),
      check('password', 'Your password must be at least 5 characters').exists().isLength({min: 5}).trim().escape(),
      check('passwordConf', 'Passwords do not match').custom((value, {req}) => (value == req.body.password)).trim().escape()
    ],
    login: [
      check('userName').exists().trim().escape().custom(value => {
        return models.User.findOne({where: {'userName': value}}).then(user => {
          if (!user) {
            return Promise.reject('Username not found')
          }
        })
      }),
      check('password').exists().trim().escape().custom((value, {req}) => {
        return models.User.findOne({where: {'userName': req.body.userName}}).then(user => {
          return bcrypt.compare(value, user.password).then((error) => {
            if(!error) {
              return Promise.reject('Password does not match')
            }
          })
        })
      })
    ],
    result: (req, res, next) => {
      const errors = validationResult(req)
      
      if(!errors.isEmpty()) {
        return res.status(422).json(errors.array())
      } else {
        return next()
      }
    }
  },
  password: {
    encrypt: (req, res, next) => {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        req.body.password = hash
        return next()
      })
    }
  }
}