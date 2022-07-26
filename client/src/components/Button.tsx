import {
	BUTTON_CLASSES,
	BUTTON_LABELS,
	BUTTON_VARIANT,
} from '../constants/button'
import { ELEMENTS } from '../constants/component'
import '../sass/components/_buttons.scss'

type ButtonProps = JSX.IntrinsicElements[ELEMENTS.BUTTON] & {
	variant: BUTTON_VARIANT
	label: BUTTON_LABELS
}

const Button = ({ variant, label, ...rest }: ButtonProps) => {
	switch (variant) {
		case BUTTON_VARIANT.ACCENT_BORDER_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.ACCENT} ${BUTTON_CLASSES.BORDER_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.ACCENT_ELEVATED_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.ACCENT} ${BUTTON_CLASSES.ELEVATED_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.ACCENT_HIGHLIGHTED_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.ACCENT} ${BUTTON_CLASSES.HIGHLIGHTED_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.ACCENT_TRANSPARENT:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.ACCENT} ${BUTTON_CLASSES.TRANSPARENT}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.DANGER_BORDER_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.DANGER} ${BUTTON_CLASSES.BORDER_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.DANGER_ELEVATED_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.DANGER} ${BUTTON_CLASSES.ELEVATED_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.DANGER_HIGHLIGHTED_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.DANGER} ${BUTTON_CLASSES.HIGHLIGHTED_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.DANGER_TRANSPARENT:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.DANGER} ${BUTTON_CLASSES.TRANSPARENT}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.PRIMARY_BORDER_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.PRIMARY} ${BUTTON_CLASSES.BORDER_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.PRIMARY} ${BUTTON_CLASSES.ELEVATED_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.PRIMARY_HIGHLIGHTED_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.PRIMARY} ${BUTTON_CLASSES.HIGHLIGHTED_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.PRIMARY_TRANSPARENT:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.PRIMARY} ${BUTTON_CLASSES.TRANSPARENT}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.SECONDARY_BORDER_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.SECONDARY} ${BUTTON_CLASSES.BORDER_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.SECONDARY_ELEVATED_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.SECONDARY} ${BUTTON_CLASSES.ELEVATED_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.SECONDARY_HIGHLIGHTED_ROUNDED:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.SECONDARY} ${BUTTON_CLASSES.HIGHLIGHTED_ROUNDED}`}
					{...rest}
				>
					{label}
				</button>
			)
		case BUTTON_VARIANT.SECONDARY_TRANSPARENT:
			return (
				<button
					className={`${BUTTON_CLASSES.BASE} ${BUTTON_CLASSES.SECONDARY} ${BUTTON_CLASSES.TRANSPARENT}`}
					{...rest}
				>
					{label}
				</button>
			)
		default:
			return null
	}
}

export default Button
