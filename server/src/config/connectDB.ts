import mongoose, { ConnectOptions } from 'mongoose'
import getError from '../helpers/getError'
import { NODE_ENV } from '../constants/misc'

const stringOptions = 'serverSelectionTimeoutMS=60000&connectTimeoutMS=60000'
export const mongoURI =
	process.env.NODE_ENV === NODE_ENV.PRODUCTION
		? process.env.MONGO_URI_PROD + stringOptions
		: process.env.MONGO_URI_DEV + stringOptions

const options: ConnectOptions = {
	serverSelectionTimeoutMS: 60 * 1000,
	connectTimeoutMS: 60 * 1000,
}

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, options)
	} catch (error) {
		console.error(getError(error))
	}
}

export default connectDB
