import { QUERIES } from '../constants/queries'
import { UserType } from '../hooks/useAuth'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

const useQueryData = () => {
	const queryClient = useQueryClient()

	const profile = useMemo(
		() => queryClient.getQueriesData<UserType>([QUERIES.USER_PROFILE]),
		[queryClient],
	)

	return { profile }
}

export default useQueryData
