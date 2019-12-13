import { AuthService } from '@service/AuthService'
import { ViewController } from '@controller/ViewController'
import { SessionController } from '@controller/SessionController'

export const FormRoute = [
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