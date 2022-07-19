import express from 'express'
import passport from '../middlewares/passport'
import { STRATEGY } from '../constants/misc'
import ROUTES from '../constants/routes'
import validateRequest from '../middlewares/validator'
import isAuthenticated from '../middlewares/authenticator'
import { registerValidator, loginValidator } from '../validators/auth.validator'
import {
	googleAuthenticateOptions,
	googleLogin,
	localAuthenticationOptions,
	localLogin,
	logout,
	register,
} from '../controllers/auth.controller'

const router = express.Router()

router.post(
	ROUTES.AUTH_REGISTER_LOCAL,
	validateRequest(registerValidator),
	register
)

router.post(
	ROUTES.AUTH_LOGIN_LOCAL,
	validateRequest(loginValidator),
	passport.authenticate(STRATEGY.LOCAL),
	localLogin
)

router.get(
	ROUTES.AUTH_LOGIN_GOOGLE,
	passport.authenticate(STRATEGY.GOOGLE, googleAuthenticateOptions)
)
router.get(
	ROUTES.AUTH_GOOGLE_REDIRECT,
	passport.authenticate(STRATEGY.GOOGLE),
	googleLogin
)

router.get(ROUTES.AUTH_LOGOUT, isAuthenticated, logout)

export default router
