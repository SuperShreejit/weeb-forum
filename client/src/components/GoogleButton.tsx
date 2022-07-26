import {
	BUTTON_CLASSES,
	BUTTON_LABELS,
	BUTTON_TYPES,
} from '../constants/button'
import useGoogleAuth from '../hooks/useGoogleAuth'
import {FcGoogle} from 'react-icons/fc'
import { NAVLINK_ICON_SIZE } from '../constants/component'
import '../sass/components/_google-button.scss'

const GoogleButton = () => {
	const handleGoogleAuth = useGoogleAuth()
	return (
		<button
			type={BUTTON_TYPES.BUTTON}
			className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.GOOGLE}`}
			onClick={handleGoogleAuth}
		>
      {BUTTON_LABELS.GOOGLE}
      <FcGoogle size={NAVLINK_ICON_SIZE}/>
		</button>
	)
}

export default GoogleButton
