import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'
import { ResetPasswordValuesType } from '../validations/resetPassword'

export type ResetPasswordSuccessType = {
	success: true
}

export type ResetPasswordFailType = {
	success: false
	msg: string
}

const useResetPassword = () =>
	useMutation((data: ResetPasswordValuesType) =>
		axiosServer
			.patch<ResetPasswordSuccessType>(
				SERVER_ROUTES.USERS_BASE + SERVER_ROUTES.FORGOT_PASSWORD,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<ResetPasswordFailType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)

export default useResetPassword
