import 'reflect-metadata'
import * as express from 'express'
import * as session from 'express-session'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import { createConnection, getConnection } from 'typeorm'
import { ApiRoutes, ViewRoutes } from "./routes"
import { TypeormStore } from 'typeorm-store'
import { Session } from '@entity/session'

dotenv.config()

createConnection().then(async connection => {

    const app = express()

    const PUBLIC = './public'
    const NODE_MODULES = './node_modules'

    app.set('view engine', 'pug')
    app.set('views', PUBLIC)
    app.use(express.static(PUBLIC))
    app.use(express.static(NODE_MODULES))

    app.use(cors())
    app.use(helmet())
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))

    const repository = getConnection().getRepository(Session)

    app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({ repository }),
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      }
    }))

    ApiRoutes.forEach(route => {
        app[route.method](route.path, route.middleware, (req, res, next) => {
          route.action(req, res)
              .then(() => next)
              .catch(err => next(err))
        })
    })

    ViewRoutes.forEach(route => {
      app[route.method](route.path, route.middleware, (req, res, next) => {
        route.action(req, res)
      })
    })

    app.listen(3000)

    console.log("Express application is up and running on port 3000")

}).catch(error => console.log("TypeORM connection error: ", error))