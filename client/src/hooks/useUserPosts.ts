import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { PostType } from '../components/Post'
import { queryOptions } from '../constants/queries'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'

type UserPostsSuccessResponse = {
  success: true
  posts: PostType[] | []
}

type UserPostsFailureResponse = {
	success: false
	msg: string
}

const useUserPosts = (userId: string) => {
	return useQuery(
		[`${userId}-posts`],
		() =>
			axiosServer
				.get<UserPostsSuccessResponse>(
					SERVER_ROUTES.POSTS_BASE + SERVER_ROUTES.GET_USER_POSTS + userId,
				)
				.then(res => res)
				.catch((error: Error | AxiosError) => {
					if (axios.isAxiosError(error) && error.response)
						return error.response as AxiosResponse<UserPostsFailureResponse>
					else if (axios.isAxiosError(error) && error.request)
						return error.message
				}),
		queryOptions,
	)
}

export default useUserPosts
