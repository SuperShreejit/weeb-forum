import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { SERVER_ROUTES } from "../constants/routes"
import axiosServer from "../lib/axios"

export type EditPostSuccessResponseType = {
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

export type EditPostFailResponseType = {
	success: false
	msg: string
}

type EditPostRequestData = {
	title: string
	post: string
	keys: string[]
}

const useEditPost = (postId: string) =>
	useMutation((data: EditPostRequestData) =>
		axiosServer
			.post<EditPostSuccessResponseType>(
				SERVER_ROUTES.POSTS_BASE + SERVER_ROUTES.UPDATE_POST + postId,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<EditPostFailResponseType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)

export default useEditPost