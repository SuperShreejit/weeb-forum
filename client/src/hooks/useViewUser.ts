import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { queryOptions } from '../constants/queries'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'

type UserSuccessResponse = {
	success: true
	user: {
		_id: string
		name: string
		username: string
		email: string
		authType: string
		createdAt: string
		avatarId: {
			id: string
			avatar: string
			mimeType: string
			filename: string
		}
	}
}

type UserFailureResponse = {
	success: false
	msg: string
}

const useViewUser = (userId: string) => {
  return useQuery(
		[`${userId}-user`],
		() =>
			axiosServer
				.get<UserSuccessResponse>(
					SERVER_ROUTES.USERS_BASE + SERVER_ROUTES.GET_USER + userId,
				)
				.then(res => res)
				.catch((error: Error | AxiosError) => {
					if (axios.isAxiosError(error) && error.response)
						return error.response as AxiosResponse<UserFailureResponse>
					else if (axios.isAxiosError(error) && error.request)
						return error.message
				}),
		queryOptions,
	)
}

export default useViewUser