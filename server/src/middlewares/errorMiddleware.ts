import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../helpers/CustomError'
import errorHandler from '../helpers/ErrorHandler'

export default (
	err: CustomError | Error,
	req: Request,
	res: Response,
	next: NextFunction
) => errorHandler(err, res)
