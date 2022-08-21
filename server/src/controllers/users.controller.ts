import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import errorHandler from '../helpers/ErrorHandler'
import generateOTP from '../helpers/generateOTP'
import { CustomError } from '../helpers/CustomError'
import { SUBJECTS, TEMPLATE_FILES } from '../constants/templates'
import ROUTES from '../constants/routes'
import ERRORS from '../constants/errors'
import { TOKENS } from '../constants/misc'
import { sendMail, generateMailbodies } from '../services/nodemailer'
import { generateToken, validateToken } from '../services/token.services'
import {
	findUserById,
	updateUser,
	deleteUser,
	findSingleUser,
	updateAvatar,
	findUserWithAvatar,
	findUsers,
} from '../services/user.services'
import generateSalt from '../helpers/generateSalt'
import bcrypt from 'bcrypt'

export const sendVerifyEmail = async (req: Request, res: Response) => {
	const email = req.body.email
	try {
		const user = await findSingleUser({ email })
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const OTP = generateOTP()
		await generateToken(user.id, OTP, TOKENS.EMAIL)

		const { text, html } = await generateMailbodies(
			TEMPLATE_FILES.EMAIL_VERIFY,
			{
				name: user.username,
				home: ROUTES.FULL_CLIENT_URL,
				OTP,
			},
		)
		sendMail(user.email, SUBJECTS.EMAIL_VERIFY, text, html)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}

export const verifyEmail = async (req: Request, res: Response) => {
	const email = req.body.email
	const token = req.body.otp
	try {
		const user = await findSingleUser({ email })
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const isValid = await validateToken(token, user.id, TOKENS.EMAIL)
		if (!isValid)
			throw new CustomError(ERRORS.INVALID_OTP, StatusCodes.CONFLICT)

		await updateUser(user.id, { verified: true })

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}

export const sendForgotPassword = async (req: Request, res: Response) => {
	const email = req.body.email
	try {
		const user = await findSingleUser({ email })
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const OTP = generateOTP()
		await generateToken(user.id, OTP, TOKENS.PASSWORD)

		const { text, html } = await generateMailbodies(
			TEMPLATE_FILES.RESET_PASSWORD,
			{
				name: user.username,
				home: ROUTES.FULL_CLIENT_URL,
				OTP,
			},
		)
		sendMail(user.email, SUBJECTS.RESET_PASSWORD, text, html)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}

export const resetPassword = async (req: Request, res: Response) => {
	const { otp, email, newPassword } = req.body
	try {
		const user = await findSingleUser({ email })
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const isValid = await validateToken(otp, user.id, TOKENS.PASSWORD)
		if (!isValid)
			throw new CustomError(ERRORS.INVALID_OTP, StatusCodes.CONFLICT)

		const salt = await generateSalt()
		const hash = await bcrypt.hash(newPassword, salt)
		await updateUser(user.id, { password: hash })

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}

export const changeUsername = async (req: Request, res: Response) => {
	const userId = req.params.userId
	const { password, username } = req.body
	try {
		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		if (user.username_changed)
			throw new CustomError(ERRORS.USERNAME_CHANGED, StatusCodes.CONFLICT)

		const isPasswordValid = await user.comparePassword(password)
		if (!isPasswordValid)
			throw new CustomError(ERRORS.INCORRECT_PASSWORD, StatusCodes.UNAUTHORIZED)

		const user_username = await findSingleUser({ username })
		if (user_username)
			throw new CustomError(ERRORS.USERNAME_EXISTS, StatusCodes.CONFLICT)

		await updateUser(user.id, { username, username_changed: true })

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}

export const changePassword = async (req: Request, res: Response) => {
	const userId = req.params.userId
	const { oldPassword, newPassword } = req.body
	try {
		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const isPasswordValid = await user.comparePassword(oldPassword)
		if (!isPasswordValid)
			throw new CustomError(ERRORS.INCORRECT_PASSWORD, StatusCodes.UNAUTHORIZED)

		const salt = await generateSalt()
		const hash = await bcrypt.hash(newPassword, salt)

		await updateUser(user.id, { password: hash })
		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}

export const changeAvatar = async (req: Request, res: Response) => {
	const userId = req.params.userId
	const file = req.file
	try {
		if (!file)
			throw new CustomError(ERRORS.MISSING_FILE, StatusCodes.BAD_REQUEST)

		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const update = {
			filename: user.id + file.originalname,
			avatar: file.buffer,
			mimeType: file.mimetype,
		}
		await updateAvatar({ userId }, update)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}

export const sendDeactivateUser = async (req: Request, res: Response) => {
	const userId = req.params.userId
	try {
		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const OTP = generateOTP()
		await generateToken(user.id, OTP, TOKENS.DEACTIVATE)

		const { text, html } = await generateMailbodies(TEMPLATE_FILES.DEACTIVATE, {
			name: user.username,
			home: ROUTES.FULL_CLIENT_URL,
			OTP,
		})
		sendMail(user.email, SUBJECTS.DEACTIVATE, text, html)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}

export const deactivateUser = async (req: Request, res: Response) => {
	const userId = req.params.userId
	const { otp, password } = req.body
	try {
		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const isPasswordValid = await user.comparePassword(password)
		if (!isPasswordValid)
			throw new CustomError(ERRORS.INCORRECT_PASSWORD, StatusCodes.UNAUTHORIZED)

		const isValid = await validateToken(otp, user.id, TOKENS.DEACTIVATE)
		if (!isValid)
			throw new CustomError(ERRORS.INVALID_OTP, StatusCodes.CONFLICT)

		await deleteUser(user.id)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}

export const getUser = async (req: Request, res: Response) => {
	const userId = req.params.userId
	try {
		const user = await findUserWithAvatar(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		res.json({ success: true, user })
	} catch (error) {
		errorHandler(error, res)
	}
}

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await findUsers()
		res.json({
			success: true,
			users: users.length > 0 ? users : ERRORS.USER_NOT_FOUND,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
