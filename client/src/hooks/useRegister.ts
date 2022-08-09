import { useMutation } from '@tanstack/react-query'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'
import { registerValuesType } from '../validations/register'
import axios, { AxiosError, AxiosResponse } from 'axios'

export type RegisterSuccessResponseType = {
	success: true
	user:
		| {
				id: string
				name: string
				usename: string
				email: string
				authType: string
				avatar: string
		  }
		| {}
}

export type RegisterFailResponseType = {
	success: false
	msg: string
}

const useRegister = () =>
	useMutation((data: registerValuesType) =>
		axiosServer
			.post<RegisterSuccessResponseType>(
				SERVER_ROUTES.AUTH_BASE + SERVER_ROUTES.AUTH_REGISTER_LOCAL,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response) return error.response as AxiosResponse<RegisterFailResponseType>
				else if (axios.isAxiosError(error) && error.request) return error.message
				else return error.message
			}),
	)

export default useRegister
