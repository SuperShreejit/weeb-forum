import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { queryOptions } from '../constants/queries'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'

export type DeactivateUserOTPSuccessType = {
	success: true
}

export type DeactivateUserOTPFailType = {
	success: false
	msg: string
}

const useSendDeactivateUserOTP = (userId: string) => {
  return useQuery(
    [`${userId}-deactivate`],
    () =>
      axiosServer
        .get<DeactivateUserOTPSuccessType>(
          SERVER_ROUTES.USERS_BASE + SERVER_ROUTES.DEACTIVATE_USER + userId,
        )
        .then(res => res)
        .catch((error: Error | AxiosError) => {
          if (axios.isAxiosError(error) && error.response)
            return error.response as AxiosResponse<DeactivateUserOTPFailType>
          else if (axios.isAxiosError(error) && error.request)
            return error.message
        }),
    queryOptions,
  )
}

export default useSendDeactivateUserOTP