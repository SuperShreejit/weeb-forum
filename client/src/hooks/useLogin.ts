import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { SERVER_ROUTES } from "../constants/routes"
import axiosServer from "../lib/axios"
import { loginValuesType } from "../validations/login"

export type LoginSuccessResponseType = {
	success: true
	user: {
		id: string
		name: string
		usename: string
		email: string
		authType: string
    avatar: {
      id: string
      filename: string
      mimeType: string
      avatar: Buffer
    }
	}
}

export type LoginFailResponseType = {
  success: false
  msg: string
}

const useLogin = () =>
	useMutation((data: loginValuesType) =>
		axiosServer
			.post<LoginSuccessResponseType>(
				SERVER_ROUTES.AUTH_BASE + SERVER_ROUTES.AUTH_LOGIN_LOCAL,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<LoginFailResponseType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)

export default useLogin