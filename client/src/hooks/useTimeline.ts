import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { PostType } from '../components/Post'
import { QUERIES } from '../constants/queries'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'

type TimelineSuccessResponseType = {
	success: true
	posts: PostType[] | []
}

type TimelineFailResponseType = {
	success: false
	msg: string
}

const useTimeline = () => {
	return useQuery(
		[QUERIES.TIMELINE],
		() =>
			axiosServer
				.get<TimelineSuccessResponseType>(
					SERVER_ROUTES.POSTS_BASE + SERVER_ROUTES.GET_POSTS,
				)
				.then(res => res)
				.catch((error: Error | AxiosError) => {
					if (axios.isAxiosError(error) && error.response)
						return error.response as AxiosResponse<TimelineFailResponseType>
					else if (axios.isAxiosError(error) && error.request)
						return error.message

				}),
		{
			cacheTime: 15 * 1000,
			staleTime: 15 * 1000,
		},
	)
	
}

export default useTimeline
