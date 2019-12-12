import { UserService } from '@service/UserService'
import { UserController } from '@controller/UserController'
import { AuthService } from '@service/AuthService'
import { SessionController } from '@controller/SessionController'
import { ViewController } from '@controller/ViewController'
import { ImageController } from '@controller/ImageController'
import { PredictionController } from '@controller/PredictionController'

export const ApiRoutes = [
  {
    path: "/users",
    method: "get",
    middleware: [],
    action: UserController.findAll,
  },
  {
    path: "/users/:id",
    method: "get",
    middleware: [],
    action: UserController.findById,
  },
  {
    path: "/users/register",
    method: "post",
    middleware: [ UserService.validateRegistration, UserService.validationResult, UserService.encryptPassword ],
    action: UserController.create,
  },
  {
    path: "/users/login",
    method: "post",
    middleware: [ UserService.validateLogin, UserService.validationResult, SessionController.create ],
    action: UserController.findBySession
  },
  {
    path: "/images",
    method: "get",
    middleware: [ ],
    action: ImageController.findAll
  },
  {
    path: "/images/upload",
    method: "post",
    middleware: [ ImageController.uploadSingle, ImageController.parseMetaData, ImageController.create, PredictionController.create ],
    action: async (req, res) => { await res.send({ data: "Upload complete" }) }
  }
]

export const ViewRoutes = [
  {
    path: "/",
    method: "get",
    middleware: [ AuthService.requireAuthentication('/login') ],
    action: ViewController.renderDashboard
  },
  {
    path: "/dashboard",
    method: "get",
    middleware: [ AuthService.requireAuthentication('/login') ],
    action: ViewController.renderDashboard
  },
  {
    path: "/register",
    method: "get",
    middleware: [ AuthService.checkAuthentication('/dashboard') ],
    action: ViewController.renderRegister
  },
  {
    path: "/login",
    method: "get",
    middleware: [ AuthService.checkAuthentication('/dashboard') ],
    action: ViewController.renderLogin
  },
  {
    path: "/logout",
    method: "get",
    middleware: [ SessionController.delete ],
    action: ViewController.redirect('/login')
  }
]