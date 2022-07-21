import { BUTTON_LABELS, BUTTON_VARIANT } from '../constants/button'
import { APP_HEADER_CLASS } from '../constants/header'
import Button from './Button'
import Title from './Title'
import useAuth from '../hooks/useAuth'
import useNavigation from '../hooks/useNavigations'
import { CONTAINER_CLASS } from '../constants/component'
import ProfileImage from './ProfileImage'
import NavLink from './NavLink'
import { LINK_VARIANT } from '../constants/links'
import { CLIENT_ROUTES } from '../constants/routes'
import Loading from './Loading'
import Paragraph from './Paragraph'
import { PARAGRAPH_VARIANT } from '../constants/paragraph'
import ERRORS from '../constants/errors'

const AppHeader = () => {
	const { isAuth, logout, user, image, res } = useAuth()
	const { navigateToSignUp } = useNavigation()

	if (!isAuth)
		return (
			<header className={APP_HEADER_CLASS}>
				<Title />
				<Button
					label={BUTTON_LABELS.SIGN_UP}
					variant={BUTTON_VARIANT.ACCENT_HIGHLIGHTED_ROUNDED}
					onClick={navigateToSignUp}
				/>
			</header>
		)

	if (res.isLoading)
		return (
			<header className={APP_HEADER_CLASS}>
				<Title />
				<Loading />
			</header>
		)

	if (
		res.isError ||
		!user ||
		!user.avatarId ||
		!image.mimeType ||
		!image.buffer
	)
		return (
			<header className={APP_HEADER_CLASS}>
				<Title />
				<Paragraph
					variant={PARAGRAPH_VARIANT.REGULAR}
					text={ERRORS.FETCH_USER_FAILED}
				/>
			</header>
		)

	return (
		<header className={APP_HEADER_CLASS}>
			<Title />
			<div className={CONTAINER_CLASS.FLEX}>
				<div className={CONTAINER_CLASS.FLEX}>
					<ProfileImage
						image={image}
						to={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.PROFILE}`}
						username={user.username}
					/>
					<NavLink
						label={user.username}
						variant={LINK_VARIANT.CAPTION_LINK}
						to={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.PROFILE}`}
					/>
				</div>
				<Button
					label={BUTTON_LABELS.LOGOUT}
					variant={BUTTON_VARIANT.SECONDARY_BORDER_ROUNDED}
					onClick={logout}
				/>
			</div>
		</header>
	)
}

export default AppHeader
