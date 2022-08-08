import { useMutation } from '@tanstack/react-query'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'

type RegisterResponseType = {
	success: boolean
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

const useRegister = () =>
	useMutation(
		async data =>
			await axiosServer.post<RegisterResponseType>(
				SERVER_ROUTES.AUTH_BASE + SERVER_ROUTES.AUTH_REGISTER_LOCAL,
				data,
			),
	)

export default useRegister
