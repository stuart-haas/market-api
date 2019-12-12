const model = require('../middleware/user.middleware')
const controller = require('../controllers/user.controller')
const session = require('../middleware/session.middleware')

const routes = (app) => {
  app.route('/users/register')
  .post(model.validation.register, model.validation.result, model.password.encrypt, controller.register.post)
  .get(session.auth.redirect('/dashboard'), controller.register.get)

  app.route('/users/login')
    .post(model.validation.login, model.validation.result, session.save, controller.login.post)
    .get(session.auth.redirect('/dashboard'), controller.login.get)
  
  app.route('/users/logout')
    .get(session.destroy, controller.logout)
}

module.exports = routes