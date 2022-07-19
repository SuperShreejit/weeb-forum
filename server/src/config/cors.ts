import { CorsOptions } from 'cors'
import { whitelist } from '../constants/misc'
import ERRORS from '../constants/errors'
import { CustomError } from '../helpers/CustomError'
import { StatusCodes } from 'http-status-codes'

const corsOptions: CorsOptions = {
	credentials: true,
	origin: (origin, cb) => {
		if(!origin) return cb(null, true)
		return (whitelist.indexOf(origin as string) !== -1)
			? cb(null, true)
			: cb(new CustomError(ERRORS.CORS, StatusCodes.UNAUTHORIZED))
	},
}

export default corsOptions
