import ERRORS from '../constants/errors'
import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CustomError } from './CustomError'
import getError from './getError'

const errorHandler = (error: unknown, res: Response) => {
	if (error instanceof CustomError)
		return res
			.status(error.statusCode)
			.json({ success: false, msg: error.message })
	else if (
		error instanceof Error &&
		(error.name === 'ValidationError' || error.name === 'CastError')
	)
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ success: false, msg: getError(error) })
	else if (error instanceof Error && checkError(error.message))
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ success: false, msg: getError(error) })
	else
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ success: false, msg: getError(error) })
}

const checkError = (error: string) => Object.values(ERRORS).includes(error as ERRORS)

export default errorHandler
