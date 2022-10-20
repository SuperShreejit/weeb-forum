import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'
import { ChangePasswordType } from '../validations/changePassword'

export type ChangePasswordSuccessType = {
	success: true
}

export type ChangePasswordFailType = {
	success: false
	msg: string
}

const useChangePassword = (userId: string) => {
	return useMutation((data: ChangePasswordType) =>
		axiosServer
			.post<ChangePasswordSuccessType>(
				SERVER_ROUTES.USERS_BASE + SERVER_ROUTES.CHANGE_PASSWORD + userId,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<ChangePasswordFailType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)
}

export default useChangePassword
