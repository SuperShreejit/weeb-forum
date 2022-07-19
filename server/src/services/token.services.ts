import EmailToken, { EmailTokenType } from '../models/EmailToken'
import PasswordToken, { PasswordTokenType } from '../models/PasswordToken'
import DeactivateToken, { DeactivateTokenType } from '../models/DeactivateToken'
import { FilterQuery, UpdateQuery, QueryOptions, Types } from 'mongoose'
import { TOKENS } from '../constants/misc'
import { CustomError } from '../helpers/CustomError'
import getError from '../helpers/getError'
import { StatusCodes } from 'http-status-codes'

type TokenFilterQuery = FilterQuery<
	EmailTokenType | PasswordTokenType | DeactivateTokenType
>
type TokenUpdateQuery = UpdateQuery<
	EmailTokenType | PasswordTokenType | DeactivateTokenType
>
type TokenQueryOptions = QueryOptions<
	EmailTokenType | PasswordTokenType | DeactivateTokenType
>

export const findSingleToken = async (
	query: TokenFilterQuery,
	type: TOKENS
) => {
	try {
		switch (type) {
			case TOKENS.EMAIL:
				return await EmailToken.findOne(query)

			case TOKENS.PASSWORD:
				return await PasswordToken.findOne(query)

			case TOKENS.DEACTIVATE:
				return await DeactivateToken.findOne(query)

			default:
				return null
		}
	} catch (error) {
		throw new CustomError(getError(error), StatusCodes.BAD_REQUEST)
	}
}

export type BodyType = {
	userId: Types.ObjectId
	token: string
}

export const createToken = async (body: BodyType, type: TOKENS) => {
	try {
		switch (type) {
			case TOKENS.EMAIL:
				const newEmailToken = new EmailToken(body)
				return await newEmailToken.save()

			case TOKENS.PASSWORD:
				const newPasswordToken = new PasswordToken(body)
				return await newPasswordToken.save()

			case TOKENS.DEACTIVATE:
				const newDeactivateToken = new DeactivateToken(body)
				return await newDeactivateToken.save()

			default:
				return null
		}
	} catch (error) {
		throw new CustomError(getError(error), StatusCodes.BAD_REQUEST)
	}
}

export const updateToken = async (
	query: TokenFilterQuery,
	update: TokenUpdateQuery,
	type: TOKENS
) => {
	try {
		const updateOptions: TokenQueryOptions = { new: true }
		switch (type) {
			case TOKENS.EMAIL:
				return await EmailToken.findOneAndUpdate(query, update, updateOptions)

			case TOKENS.PASSWORD:
				return await PasswordToken.findOneAndUpdate(
					query,
					update,
					updateOptions
				)

			case TOKENS.DEACTIVATE:
				return await DeactivateToken.findOneAndUpdate(
					query,
					update,
					updateOptions
				)

			default:
				return null
		}
	} catch (error) {
		throw new CustomError(getError(error), StatusCodes.BAD_REQUEST)
	}
}

export const deleteToken = async (query: TokenFilterQuery, type: TOKENS) => {
	try {
		switch (type) {
			case TOKENS.EMAIL:
				return await EmailToken.deleteOne(query)

			case TOKENS.PASSWORD:
				return await PasswordToken.deleteOne(query)

			case TOKENS.DEACTIVATE:
				return await DeactivateToken.deleteOne(query)

			default:
				return null
		}
	} catch (error) {
		throw new CustomError(getError(error), StatusCodes.BAD_REQUEST)
	}
}

export const validateToken = async (
	token: string,
	userId: Types.ObjectId,
	type: TOKENS
) => {
	const stored_token = await findSingleToken({ userId }, type)
	if (!stored_token) return false

	const isValid = await stored_token.compareToken(token)
	if (!isValid) return false

	await deleteToken({ userId }, type)
	return true
}

export const generateToken = async (
	userId: Types.ObjectId,
	token: string,
	type: TOKENS
) => {
	try {
		const token_saved = await findSingleToken({ userId }, type)
		if (token_saved) await updateToken({ userId }, { token }, type)
		else await createToken({ userId, token }, type)
	} catch (error) {
		throw new CustomError(getError(error), StatusCodes.INTERNAL_SERVER_ERROR)
	}
}
