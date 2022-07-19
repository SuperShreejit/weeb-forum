import { Request, Response, NextFunction } from 'express'
import errorHandler from '../helpers/ErrorHandler'
import { CustomError } from '../helpers/CustomError'
import { StatusCodes } from 'http-status-codes'
import ERRORS from '../constants/errors'

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	return req.isAuthenticated()
		? next()
		: errorHandler(
				new CustomError(ERRORS.UNAUTHORIZED, StatusCodes.UNAUTHORIZED),
				res
		  )
}

export default isAuthenticated
