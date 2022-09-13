import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { PostType } from '../components/Post'
import { QUERIES, queryOptions } from '../constants/queries'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'
import { UserType } from './useAuth'

type SearchSuccessResponseType = {
success: true
result : PostType[] | UserType[] | []
}

type SearchFailResponseType = {
  success: false
  msg: string
}

const useSearch = () =>
	useQuery(
		[QUERIES.SEARCH],
		() =>
			axiosServer
				.get<SearchSuccessResponseType>(
					SERVER_ROUTES.POSTS_BASE + SERVER_ROUTES.GET_POSTS,
				)
				.then(res => res)
				.catch((error: Error | AxiosError) => {
					if (axios.isAxiosError(error) && error.response)
						return error.response as AxiosResponse<SearchFailResponseType>
					else if (axios.isAxiosError(error) && error.request)
						return error.message
				}),
		queryOptions,
	)

export default useSearch
