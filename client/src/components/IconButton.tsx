import {
	MdThumbUp,
	MdComment,
	MdClose,
	MdThumbDown,
	MdMoreVert,
} from 'react-icons/md'
import { ICON_BUTTON_VARIANT, ICON_BUTTON_CLASS } from '../constants/iconButton'

type IconButtonProps = JSX.IntrinsicElements['button'] & {
	variant: ICON_BUTTON_VARIANT
}

const IconButton = ({ variant, ...rest }: IconButtonProps) => {
	switch (variant) {
		case ICON_BUTTON_VARIANT.CLOSE:
			return (
				<button className={`${ICON_BUTTON_CLASS}`} {...rest}>
					<MdClose />
				</button>
			)
		case ICON_BUTTON_VARIANT.COMMENT:
			return (
				<button className={`${ICON_BUTTON_CLASS}`} {...rest}>
					<MdComment />
				</button>
			)
		case ICON_BUTTON_VARIANT.DISLIKE:
			return (
				<button className={`${ICON_BUTTON_CLASS}`} {...rest}>
					<MdThumbDown />
				</button>
			)
		case ICON_BUTTON_VARIANT.LIKE:
			return (
				<button className={`${ICON_BUTTON_CLASS}`} {...rest}>
					<MdThumbUp />
				</button>
			)
		case ICON_BUTTON_VARIANT.OPTIONS:
			return (
				<button className={`${ICON_BUTTON_CLASS}`} {...rest}>
					<MdMoreVert />
				</button>
			)
		default:
			return null
	}
}

export default IconButton
