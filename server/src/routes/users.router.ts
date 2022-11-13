import { Router } from 'express'
import ROUTES from '../constants/routes'
import isAuthenticated from '../middlewares/authenticator'
import validateRequest from '../middlewares/validator'
import upload from '../middlewares/multer'
import {
	getEmailVerifySchema,
	getForgotPasswordSchema,
	getDeactivateSchema,
	verifyEmailSchema,
	resetPasswordSchema,
	deactivateSchema,
	changeAvatarSchema,
	changeUsernameSchema,
	changePasswordSchema,
	getUserSchema,
} from '../validators/users.validator'
import {
	sendVerifyEmail,
	verifyEmail,
	sendForgotPassword,
	resetPassword,
	sendDeactivateUser,
	deactivateUser,
	changeAvatar,
	changePassword,
	changeUsername,
	getAllUsers,
	getUser,
} from '../controllers/users.controller'

const router = Router()
const filename = 'avatar'

router
	.route(ROUTES.VERIFY_EMAIL)
	.post(validateRequest(getEmailVerifySchema), sendVerifyEmail)
	.patch(validateRequest(verifyEmailSchema), verifyEmail)

router
	.route(ROUTES.FORGOT_PASSWORD)
	.post(validateRequest(getForgotPasswordSchema), sendForgotPassword)
	.patch(validateRequest(resetPasswordSchema), resetPassword)

router
	.route(ROUTES.DEACTIVATE_USER)
	.get(
		validateRequest(getDeactivateSchema),
		isAuthenticated,
		sendDeactivateUser
	)
	.post(validateRequest(deactivateSchema), isAuthenticated, deactivateUser)

router
	.route(ROUTES.CHANGE_AVATAR)
	.patch(
		validateRequest(changeAvatarSchema),
		isAuthenticated,
		upload.single(filename),
		changeAvatar
	)

router
	.route(ROUTES.CHANGE_PASSWORD)
	.patch(validateRequest(changePasswordSchema), isAuthenticated, changePassword)

router
	.route(ROUTES.CHANGE_USERNAME)
	.patch(validateRequest(changeUsernameSchema), isAuthenticated, changeUsername)

router.route(ROUTES.GET_USERS).get(getAllUsers)

router.route(ROUTES.GET_USER).get(validateRequest(getUserSchema), getUser)

export default router
