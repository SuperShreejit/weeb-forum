import ERRORS from '../constants/errors'
import { StatusCodes } from 'http-status-codes'

export interface CustomErrorType extends Error {
	readonly message: ERRORS | string
	readonly statusCode: StatusCodes
}

export class CustomError extends Error implements CustomErrorType {
	readonly message: ERRORS | string
	readonly statusCode: StatusCodes

	constructor(message: ERRORS | string, statusCode: StatusCodes) {
    super(message)
    this.message = message,
    this.statusCode = statusCode
	}
}
