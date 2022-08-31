import passport from 'passport'
import LocalStrategyModule, { VerifyFunction } from 'passport-local'
import GoogleStrategyModule from 'passport-google-oauth20'
import {
	createUser,
	findSingleUser,
	findUserById,
	validateUser,
	findUserWithAvatar,
} from '../services/user.services'
import { STRATEGY } from '../constants/misc'
import { DocumentDefinition, Types } from 'mongoose'
import { UserDocument } from '../models/User'
import getError from '../helpers/getError'
import ERRORS from '../constants/errors'
import ROUTES from '../constants/routes'

const LocalStrategy = LocalStrategyModule.Strategy
const verifyCallback: VerifyFunction = async (username, password, done) => {
	try {
		const result = await validateUser(username, password)
		return !result.valid
			? done(new Error(result.message), false)
			: done(null, result.user)
	} catch (error) {
		done(getError(error))
	}
}
const localStrategyOptions: LocalStrategyModule.IStrategyOptions = {
	passwordField: 'password',
	usernameField: 'username',
}
const local = new LocalStrategy(localStrategyOptions, verifyCallback)

type GoogleUserType =
	| DocumentDefinition<UserDocument>
	| null
	| (Express.User & { id: Types.ObjectId })
const GoogleStrategy = GoogleStrategyModule.Strategy
const googleOptions: GoogleStrategyModule.StrategyOptions = {
	clientID: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
	clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
	callbackURL:
		ROUTES.SERVER_URL_BASE + ROUTES.AUTH_BASE + ROUTES.AUTH_GOOGLE_REDIRECT,
}
const google = new GoogleStrategy(
	googleOptions,
	async (accessToken, refreshToken, profile, done) => {
		try {
			const email_user = await findSingleUser({
				email: profile._json.email as string,
			})
			if (email_user && email_user.authType !== STRATEGY.GOOGLE)
				throw new Error(ERRORS.INVALID_GOOGLE_LOGIN)

			let user: GoogleUserType = await findSingleUser({
				authId: profile.id,
			})

			if (!user) {
				user = await createUser({
					name: profile.displayName,
					username: profile.displayName + profile.id,
					authId: profile.id,
					authType: STRATEGY.GOOGLE,
					email: profile._json.email as string,
					verified: true,
				})
			}

			const user_found = await findUserWithAvatar(user?._id)
			if (!user_found) throw new Error(ERRORS.USER_NOT_FOUND)

			done(null, user_found)
		} catch (error) {
			done(getError(error))
		}
	}
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser(async (id: string, done) => {
	try {
		const user = await findUserWithAvatar(id)
		done(null, user)
	} catch (error) {
		done(getError(error))
	}
})

passport.use(local)
passport.use(google)
export default passport
