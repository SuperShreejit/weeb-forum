import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'

type AddCommentSuccessResponseType = {
	success: true
}

type AddCommentFailResponseType = {
	success: false
	msg: string
}

export type AddCommentValuesType = {
  comment: string
  userId: string
  postId: string
}

const useAddComment = () => {
	return useMutation((data: AddCommentValuesType) =>
		axiosServer
			.post<AddCommentSuccessResponseType>(
				`${SERVER_ROUTES.POSTS_BASE}${SERVER_ROUTES.CREATE_COMMENT}/${data.userId}/${data.postId}`,
        { comment: data.comment },
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<AddCommentFailResponseType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)
}

export default useAddComment
