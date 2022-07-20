import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../lib/redux/store'
import { AuthState } from '../lib/redux/features/auth.slice'
import { useCallback } from 'react'
import { logoutUser } from '../lib/redux/features/auth.slice'
import { useQuery, QueryFunction } from '@tanstack/react-query'
import { QUERIES } from '../constants/queries'
import axios from 'axios'
import { SERVER_ROUTES } from '../constants/routes'

type UserType =
	| {
			id: string
			name: string
			username: string
			email: string
			authType: string
			avatarId: {
				id: string
				avatar: string
				mimeType: string
				filename: string
			}
	  }
	| undefined

const fetchUser: QueryFunction<UserType> = ({ queryKey }) => {
	const url = `${SERVER_ROUTES.SERVER_BASE}${SERVER_ROUTES.SERVER_URL_BASE}${SERVER_ROUTES.USERS_BASE}\\${queryKey[1]}`
	return axios.get(url)
}

const useAuth = () => {
	const auth = useSelector<RootState, AuthState>(store => store.auth)
	const dispatch = useDispatch<AppDispatch>()

	const res = useQuery<UserType>(
		[QUERIES.USER_PROFILE, auth.userId],
		fetchUser,
	)

	const logout = useCallback(() => dispatch(logoutUser()), [dispatch])

	return { ...auth, logout, user: res?.data, res }
}

export default useAuth
