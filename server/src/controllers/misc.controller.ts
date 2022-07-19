import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import ROUTES from '../constants/routes'
import { TEMPLATE_FILES } from '../constants/templates'
import ERRORS from '../constants/errors'
import { welcome, INTERNAL_ERROR } from '../constants/misc'
import { CustomError } from '../helpers/CustomError'
import errorHandler from '../helpers/ErrorHandler'
import getError from '../helpers/getError'

export const test = (req: Request, res: Response) =>
  res.send(welcome)

export const notFound = (req: Request, res: Response) =>
  res.status(StatusCodes.NOT_FOUND).send(ERRORS.PAGE_NOT_FOUND)

//error handler test controllers
export const testError1 = (req: Request, res: Response) => {
  try {
    throw new CustomError(INTERNAL_ERROR, StatusCodes.INTERNAL_SERVER_ERROR)
  } catch (error) {
    errorHandler(error, res)
  }
}

export const testError2 = (req: Request, res: Response) => {
  try {
    throw new Error(INTERNAL_ERROR)
  } catch (error) {
    errorHandler(error, res)
  }
}

export const testError3 = (req: Request, res: Response) => {
  try {
    generateInternalError()
  } catch (error) {
    errorHandler(error, res)
  }
}

const generateInternalError = () => {
  try {
    throw new Error(INTERNAL_ERROR)    
  } catch (error) {
    throw new CustomError(getError(error), StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

//email templates test controllers
const templateOptions = {
	name: 'John Doe',
	OTP: '0000',
	home: ROUTES.FULL_CLIENT_URL,
}

export const testEmailVerify = (req: Request, res: Response) =>
  res.render(TEMPLATE_FILES.EMAIL_VERIFY, templateOptions)

export const testResetPassword = (req: Request, res: Response) =>
  res.render(TEMPLATE_FILES.RESET_PASSWORD, templateOptions)

export const testDeactivate = (req: Request, res: Response) => 
  res.render(TEMPLATE_FILES.DEACTIVATE, templateOptions)