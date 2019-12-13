import { AuthService } from '@service/AuthService'
import { ViewController } from '@controller/ViewController'

export const DashboardRoute = [
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
]