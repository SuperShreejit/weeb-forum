import { DARK_CLASS, PAGE_CONTAINER_CLASS } from '../constants/pages'
import useAuth from '../hooks/useAuth'
import useTheme from '../hooks/useTheme'

const UserSettings = () => {
	const { isDark } = useTheme()
	const { user, userId } = useAuth()

	return (
		<main
			className={
				isDark
					? `${PAGE_CONTAINER_CLASS.SETTINGS} ${DARK_CLASS}`
					: `${PAGE_CONTAINER_CLASS.SETTINGS}`
			}
		>
			UserSettings
		</main>
	)
}

export default UserSettings
