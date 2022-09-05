import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'

export type CreatePostSuccessResponseType = {
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

export type CreatePostFailResponseType = {
	success: false
	msg: string
}

type CreatePostRequestData = {
	title: string
	post: string
	keys: string[]
}

const useCreatePost = (userId: string) =>
	useMutation((data: CreatePostRequestData) =>
		axiosServer
			.post<CreatePostSuccessResponseType>(
				SERVER_ROUTES.POSTS_BASE + SERVER_ROUTES.CREATE_POST + userId,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<CreatePostFailResponseType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)

export default useCreatePost
