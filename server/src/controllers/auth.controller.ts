import { Request, Response } from 'express'
import {
	createUser,
	findSingleUser,
	findUserWithAvatar,
} from './../services/user.services'
import ERRORS from '../constants/errors'
import errorHandler from '../helpers/ErrorHandler'
import { CustomError } from '../helpers/CustomError'
import { StatusCodes } from 'http-status-codes'
import { STRATEGY } from '../constants/misc'
import { AuthenticateOptionsGoogle } from 'passport-google-oauth20'
import ROUTES from '../constants/routes'

export const register = async (req: Request, res: Response) => {
	const { name, email, username, password } = req.body
	try {
		const user_email = await findSingleUser({ email })
		if (user_email)
			throw new CustomError(ERRORS.EMAIL_EXISTS, StatusCodes.CONFLICT)

		const user_username = await findSingleUser({ username })
		if (user_username)
			throw new CustomError(ERRORS.USERNAME_EXISTS, StatusCodes.CONFLICT)

		const newUser = {
			name,
			username,
			username_changed: true,
			email,
			password,
			authType: STRATEGY.LOCAL,
		}
		const createdUser = await createUser(newUser)

		const user = await findUserWithAvatar(createdUser.id)

		res.json({
			success: true,
			user: user
				? {
						id: user.id,
						name: user.name,
						usename: user.username,
						email: user.email,
						authType: user.authType,
						avatar: user.avatarId,
				  }
				: {},
		})
	} catch (error) {
		errorHandler(error, res)
	}
}

export const localLogin = (req: Request, res: Response) => {
	try {
		if (!req.user)
			throw new CustomError(
				ERRORS.INTERNAL_ERROR,
				StatusCodes.INTERNAL_SERVER_ERROR,
			)

		res.json({ success: true, user: req.user })
	} catch (error) {
		errorHandler(error, res)
	}
}

export const currentUser = async (req: Request, res: Response) => {
	try {
		if (!req.user)
			throw new CustomError(
				ERRORS.INTERNAL_ERROR,
				StatusCodes.INTERNAL_SERVER_ERROR,
			)
		
		res.json({
			user: req.user,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}

export const logout = (req: Request, res: Response) =>
	req.logout({ keepSessionInfo: true }, () => res.json({ success: true }))

export const googleAuthenticateOptions = {
	scope: ['profile', 'email'],
}

export const googleLoginOptions: AuthenticateOptionsGoogle = {
	failureRedirect:
		ROUTES.FULL_CLIENT_URL + ROUTES.CLIENT_LOGIN + '?googleLoginFail=true',
	successRedirect: ROUTES.FULL_CLIENT_URL + ROUTES.CLIENT_USER_TIMELINE,
}
