import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'
import { ChangeUsernameType } from '../validations/changeUsername'

export type ChangeUsernameSuccessType = {
	success: true
}

export type ChangeUsernameFailType = {
	success: false
	msg: string
}

const useChangeUsername = (userId: string) => {
	return useMutation((data: ChangeUsernameType) =>
		axiosServer
			.post<ChangeUsernameSuccessType>(
				SERVER_ROUTES.USERS_BASE + SERVER_ROUTES.CHANGE_USERNAME + userId,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<ChangeUsernameFailType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)
}

export default useChangeUsername
