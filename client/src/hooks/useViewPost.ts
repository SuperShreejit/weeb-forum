import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { QUERIES, queryOptions } from '../constants/queries'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'

export type ViewPostSuccessResponseType = {
	success: true
	post: {
		id: string
		authorId: string
		title: string
		post: string
		likes: number
		likers: string[]
		dislikes: number
		dislikers: string[]
		commentCount: number
		comments: string[]
		keys: string[]
	}
}

export type ViewPostFailResponseType = {
	success: false
	msg: string
}

const useViewPost = (postId: string) => useQuery(
		[`${QUERIES.VIEW_POST}-${postId}`],
		() =>
			axiosServer
				.get<ViewPostSuccessResponseType>(
					SERVER_ROUTES.POSTS_BASE + SERVER_ROUTES.GET_POST + postId,
				)
				.then(res => res)
				.catch((error: Error | AxiosError) => {
					if (axios.isAxiosError(error) && error.response)
						return error.response as AxiosResponse<ViewPostFailResponseType>
					else if (axios.isAxiosError(error) && error.request)
						return error.message
				}),
		queryOptions,
	)

export default useViewPost
