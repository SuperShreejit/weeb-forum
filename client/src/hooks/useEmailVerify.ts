import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'

type VerifyEmailRequestDataType = {
	email: string
	otp: string
}
export type VerifyEmailSuccessResponseType =
	| {
			success: false
			msg: string
	  }
	| { success: true }
export type VerifyEmailFailResponseType = {
	success: false
	msg: string
}

type GetOTPRequestDataType = { email: string }
export type GetOTPSuccessResponseType =
	| {
			success: false
			msg: string
	  }
	| { success: true }
export type GetOTPFailResponseType = {
	success: false
	msg: string
}

const useEmailVerify = () => {
	const {
		data: OTPData,
		isSuccess: OTPIsSuccess,
		isError: OTPIsError,
		isLoading: OTPIsLoading,
		error: OTPError,
		mutate: getOTP,
	} = useMutation((data: GetOTPRequestDataType) =>
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

	const {
		mutate: verifyEmail,
		data: verifyEmailData,
		error: verifyEmailError,
		isError: verifyEmailIsError,
		isLoading: verifyEmailIsLoading,
		isSuccess: verifyEmailIsSuccess,
	} = useMutation((data: VerifyEmailRequestDataType) =>
		axiosServer
			.patch<VerifyEmailSuccessResponseType>(
				SERVER_ROUTES.USERS_BASE + SERVER_ROUTES.VERIFY_EMAIL,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<VerifyEmailFailResponseType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)

	return {
		verifyEmail,
		getOTP,
		OTPData,
		OTPError,
		OTPIsError,
		OTPIsLoading,
		OTPIsSuccess,
		verifyEmailData,
		verifyEmailError,
		verifyEmailIsError,
		verifyEmailIsLoading,
		verifyEmailIsSuccess,
	}
}

export default useEmailVerify
