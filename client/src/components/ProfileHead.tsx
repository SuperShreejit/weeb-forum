import { useMemo } from 'react'
import { CONTAINER_CLASS } from '../constants/component'
import { HEADER_VARIANT } from '../constants/header'
import { PROFILE_CLASSES, PROFILE_TEXT } from '../constants/profile'
import generateImageSource from '../helpers/generateImageSource'
import { UserType } from '../hooks/useAuth'
import DisplayProfile from './DisplayProfile'
import Header from './Header'
import '../sass/components/_pofile-head.scss'

const ProfileHead = ({ user }: { user: UserType }) => {
	const image = useMemo(() => {
		return {
			mimeType: user.user.avatarId.mimeType,
			buffer: user.user.avatarId.avatar,
		}
  }, [user])
  
  const joinedDate = useMemo(() => {
    const date = new Date(user.user.createdAt)
    return date.toUTCString()
  }, [user])

	return (
		<div className={PROFILE_CLASSES.CONTAINER_CLASS}>
			<DisplayProfile
				image={generateImageSource(image)}
				username={user.user.username}
			/>
			<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
				<Header
					variant={HEADER_VARIANT.SECONDARY_H2}
					text={user.user.name}
				/>
				<Header
					variant={HEADER_VARIANT.SECONDARY_H3}
					text={PROFILE_TEXT.USERNAME + user.user.username}
				/>
				<Header
					variant={HEADER_VARIANT.SECONDARY_H3}
					text={PROFILE_TEXT.EMAIL + user.user.email}
				/>
				<Header
					variant={HEADER_VARIANT.SECONDARY_H3}
					text={PROFILE_TEXT.JOINING + joinedDate}
				/>
			</div>
		</div>
	)
}

export default ProfileHead
