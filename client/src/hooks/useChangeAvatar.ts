import axiosServer from '../lib/axios'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { SERVER_ROUTES } from '../constants/routes'
import { useMutation } from '@tanstack/react-query'
import { ChangeAvatarType } from '../validations/changeAvatart'

export type ChangeAvatarSuccessType = {
	success: true
}

export type ChangeAvatarFailType = {
	success: false
	msg: string
}

const useChangeAvatar = (userId: string) => {
	return useMutation((data: ChangeAvatarType) =>
		axiosServer
			.post<ChangeAvatarSuccessType>(
				SERVER_ROUTES.USERS_BASE + SERVER_ROUTES.CHANGE_PASSWORD + userId,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<ChangeAvatarFailType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)
}

export default useChangeAvatar
