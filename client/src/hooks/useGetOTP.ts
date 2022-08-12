import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'

type GetOTPRequestDataType = { email: string }
export type GetOTPSuccessResponseType = { success: true }
export type GetOTPFailResponseType = {
	success: false
	msg: string
}

const useGetOTP = () => {
	const getOTP = useMutation((data: GetOTPRequestDataType) =>
		axiosServer
			.post<GetOTPSuccessResponseType>(
				SERVER_ROUTES.USERS_BASE + SERVER_ROUTES.VERIFY_EMAIL,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<GetOTPFailResponseType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)

	return getOTP
}

export default useGetOTP
