import useNavigation from '../hooks/useNavigations'
import { APP_HEADER_CLASS } from '../constants/header'
import { BUTTON_LABELS, BUTTON_VARIANT } from '../constants/button'
import Button from './Button'
import Title from './Title'
import '../sass/components/_app-header.scss'
import { CLIENT_ROUTES } from '../constants/routes'

const AppTitlebar = () => {
	const { navigateToSignUp } = useNavigation()
	return (
		<header className={APP_HEADER_CLASS}>
			<Title path={CLIENT_ROUTES.LANDING} />
			<Button
				label={BUTTON_LABELS.SIGN_UP}
				variant={BUTTON_VARIANT.ACCENT_HIGHLIGHTED_ROUNDED}
				onClick={navigateToSignUp}
			/>
		</header>
	)
}

export default AppTitlebar
