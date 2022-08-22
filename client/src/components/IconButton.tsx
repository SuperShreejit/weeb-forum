import {
	MdThumbUp,
	MdComment,
	MdClose,
	MdThumbDown,
	MdMoreVert,
	MdLogout
} from 'react-icons/md'
import { ELEMENTS, ICON_BUTTON_SIZE } from '../constants/component'
import { ICON_BUTTON_VARIANT, ICON_BUTTON_CLASS } from '../constants/iconButton'
import '../sass/components/_icon-buttons.scss'

type IconButtonProps = JSX.IntrinsicElements[ELEMENTS.BUTTON] & {
	variant: ICON_BUTTON_VARIANT
}

const IconButton = ({ variant, ...rest }: IconButtonProps) => {
	switch (variant) {
		case ICON_BUTTON_VARIANT.CLOSE:
			return (
				<button className={`${ICON_BUTTON_CLASS}`} {...rest}>
					<MdClose size={ICON_BUTTON_SIZE}/>
				</button>
			)
		case ICON_BUTTON_VARIANT.COMMENT:
			return (
				<button className={`${ICON_BUTTON_CLASS}`} {...rest}>
					<MdComment size={ICON_BUTTON_SIZE} />
				</button>
			)
		case ICON_BUTTON_VARIANT.DISLIKE:
			return (
				<button className={`${ICON_BUTTON_CLASS}`} {...rest}>
					<MdThumbDown size={ICON_BUTTON_SIZE} />
				</button>
			)
		case ICON_BUTTON_VARIANT.LIKE:
			return (
				<button className={`${ICON_BUTTON_CLASS}`} {...rest}>
					<MdThumbUp size={ICON_BUTTON_SIZE} />
				</button>
			)
		case ICON_BUTTON_VARIANT.OPTIONS:
			return (
				<button className={`${ICON_BUTTON_CLASS}`} {...rest}>
					<MdMoreVert size={ICON_BUTTON_SIZE} />
				</button>
			)
		case ICON_BUTTON_VARIANT.LOGOUT:
			return (
				<button className={`${ICON_BUTTON_CLASS}`} {...rest}>
					<MdLogout size={ICON_BUTTON_SIZE} />
				</button>
			)
		default:
			return null
	}
}

export default IconButton