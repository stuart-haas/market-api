import { UserService } from '@service/UserService'
import { UserController } from '@controller/UserController'
import { AuthService } from '@service/AuthService'
import { SessionController } from '@controller/SessionController'
import { ViewController } from '@controller/ViewController'
import { AssetController } from '@controller/AssetController'
import { CartController } from '@controller/CartController'

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
    path: "/assets",
    method: "get",
    middleware: [],
    action: AssetController.findAll
  },
  {
    path: "/assets/upload",
    method: "post",
    middleware: [ AssetController.uploadSingle ],
    action: AssetController.create
  },
  {
    path: "/cart/add",
    method: "post",
    middleware: [],
    action: CartController.add
  },
  {
    path: "/cart/get",
    method: "get",
    middleware: [],
    action: CartController.get
  },
  {
    path: "/cart/update",
    method: "put",
    middleware: [],
    action: CartController.update
  },
  {
    path: "/cart/remove",
    method: "delete",
    middleware: [],
    action: CartController.remove
  },
  {
    path: "/cart/clear",
    method: "delete",
    middleware: [],
    action: CartController.clear
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