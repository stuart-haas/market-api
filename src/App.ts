import * as express from 'express'
import {Request, Response} from "express";
import {AppRoutes} from "./routes";

class App {
  public app

  constructor () {
    this.app = express()
    this.mountRoutes(this.app)
  }

  private mountRoutes(app):void {
    AppRoutes.forEach(route => {
      app[route.method](route.path, (request: Request, response: Response, next: Function) => {
          route.action(request, response)
              .then(() => next)
              .catch((error: Error) => next(error))
      })
  });
  }
}

export default new App().app