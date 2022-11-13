import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'
import { DeactivateUserValuesType } from '../validations/deactivateUser'

export type DeactivateUserSuccessType = {
	success: true
}

export type DeactivateUserFailType = {
	success: false
	msg: string
}

const useDeactivateUser = (userId: string) => {
	return useMutation((data: DeactivateUserValuesType) =>
		axiosServer
			.post<DeactivateUserSuccessType>(
				SERVER_ROUTES.USERS_BASE + SERVER_ROUTES.DEACTIVATE_USER + userId,
				data,
			)
			.then(res => res)
			.catch((error: Error | AxiosError) => {
				if (axios.isAxiosError(error) && error.response)
					return error.response as AxiosResponse<DeactivateUserFailType>
				else if (axios.isAxiosError(error) && error.request)
					return error.message
				else return error.message
			}),
	)
}

export default useDeactivateUser
