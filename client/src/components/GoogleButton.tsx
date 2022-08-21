import {
	BUTTON_CLASSES,
	BUTTON_LABELS,
	BUTTON_TYPES,
	GOOGLE_ICON_CONTAINER,
	GOOGLE_TEXT_CONTAINER,
} from '../constants/button'
import useGoogleAuth from '../hooks/useGoogleAuth'
import { FcGoogle } from 'react-icons/fc'
import { NAVLINK_ICON_SIZE } from '../constants/component'
import '../sass/components/_google-button.scss'

const GoogleButton = () => {
	const { googleLogin } = useGoogleAuth()
	
	return (
		<button
			type={BUTTON_TYPES.BUTTON}
			className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.GOOGLE}`}
			onClick={googleLogin}
		>
			<span className={GOOGLE_TEXT_CONTAINER}>
				{BUTTON_LABELS.GOOGLE}
			</span>
			<span className={GOOGLE_ICON_CONTAINER}>
				<FcGoogle size={NAVLINK_ICON_SIZE} />
			</span>
		</button>
	)
}

export default GoogleButton
