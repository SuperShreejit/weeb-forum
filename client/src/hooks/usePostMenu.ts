import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { CLIENT_ROUTES, SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'

type RemovePostSuccessResponseType = {
	success: true
}

type RemovePostFailResponseType = {
	success: false
	msg: string
}

const usePostMenu = () => {
	const [dropdown, setDropdown] = useState<boolean>(false)
	const navigate = useNavigate()

	const editPost = useCallback(
		(postId: string) =>
			navigate(
				`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.EDIT_POST}/${postId}`,
			),
		[navigate],
	)

	const removePost = useMutation((data: string) =>
		axiosServer
			.delete<RemovePostSuccessResponseType>(
				SERVER_ROUTES.POSTS_BASE + SERVER_ROUTES.DELETE_POST + data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<RemovePostFailResponseType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
  )
  
	const handleDropdown = useCallback(() => setDropdown(prev => !prev), [])

	return { dropdown, handleDropdown, editPost, ...removePost }
}

export default usePostMenu
