import React from 'react'
import ChangeAvatarForm from '../components/ChangeAvatarForm'
import ChangePasswordForm from '../components/ChangePasswordForm'
import ChangeUsernameForm from '../components/ChangeUsernameForm'
import DeactivateUserForm from '../components/DeactivateUserForm'
import Header from '../components/Header'
import { CONTAINER_CLASS } from '../constants/component'
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import { DARK_CLASS, PAGE_CONTAINER_CLASS } from '../constants/pages'
import useTheme from '../hooks/useTheme'
import '../sass/pages/_settings.scss'

const Settings = () => {
	const { isDark } = useTheme()
	return (
		<main
			className={
				isDark
					? `${PAGE_CONTAINER_CLASS.SETTINGS} ${DARK_CLASS}`
					: `${PAGE_CONTAINER_CLASS.SETTINGS}`
			}
		>
			<Header text={HEADERS.SETTINGS} variant={HEADER_VARIANT.PRIMARY_H2} />
			<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
				<ChangeAvatarForm />
				<ChangeUsernameForm />
				<ChangePasswordForm />
				<DeactivateUserForm />
			</div>
		</main>
	)
}

export default Settings
