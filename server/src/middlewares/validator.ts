import { AnySchema } from "yup"
import { Request, Response, NextFunction } from "express"
import errorHandler from "../helpers/ErrorHandler"

const validateRequest = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params
    })
    next()
  } catch (error) {
    errorHandler(error, res)
  }
}

export default validateRequest