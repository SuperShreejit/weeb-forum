require('dotenv').config()
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import session from 'express-session'
import path from 'path'
import router from './routes/index.router'
import start from './config/start'
import ROUTES from './constants/routes'
import sessionOptions from './config/session'
import passport from './middlewares/passport'
import { TEMPLATES } from './constants/templates'
import errorMiddleware from './middlewares/errorMiddleware'
import corsOptions from './config/cors'

const app = express()

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())
app.set(TEMPLATES.VIEW_ENGINE, TEMPLATES.TEMPLATE)
app.set(TEMPLATES.VIEWS, path.join(__dirname, TEMPLATES.FOLDER))
app.use(ROUTES.SERVER_URL_BASE, router)
app.use(errorMiddleware)

start(app)
export default app