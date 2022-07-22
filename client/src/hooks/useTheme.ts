import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../lib/redux/store'
import { useCallback } from 'react'
import { switchTheme, ThemeState } from '../lib/redux/features/theme.slice'

const useTheme = () => {
	const { isDark } = useSelector<RootState, ThemeState>(store => store.theme)
	const dispatch = useDispatch<AppDispatch>()

	const toggleTheme = useCallback(() => dispatch(switchTheme()), [dispatch])

	return { isDark, toggleTheme }
}

export default useTheme