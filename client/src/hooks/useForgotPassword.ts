import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'
import { ForgotPasswordType } from '../validations/forgotPassword'

export type ForgotPasswordSuccessType = {
	success: true
}

export type ForgotPasswordFailType = {
	success: false
	msg: string
}

const useForgotPassword = () =>
	useMutation((data: ForgotPasswordType) =>
		axiosServer
			.post<ForgotPasswordSuccessType>(
				SERVER_ROUTES.USERS_BASE + SERVER_ROUTES.FORGOT_PASSWORD,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<ForgotPasswordFailType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)

export default useForgotPassword