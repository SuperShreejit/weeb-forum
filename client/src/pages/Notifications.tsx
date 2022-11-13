import React from 'react'
import { DARK_CLASS, PAGE_CONTAINER_CLASS } from '../constants/pages'
import useTheme from '../hooks/useTheme'

const Notifications = () => {
	const { isDark } = useTheme()
	return (
		<main
			className={
				isDark
					? `${PAGE_CONTAINER_CLASS.NOTIFICATIONS} ${DARK_CLASS}`
					: `${PAGE_CONTAINER_CLASS.NOTIFICATIONS}`
			}
		>
			Notifications: In Development
		</main>
	)
}

export default Notifications
