import { CorsOptions } from 'cors'
import { whitelist, CORS_HEADERS, CORS_METHODS } from '../constants/misc'

const corsOptions: CorsOptions = {
	credentials: true,
	origin: whitelist,
	optionsSuccessStatus: 200,
	methods: CORS_METHODS,
	allowedHeaders: CORS_HEADERS
}

export default corsOptions
