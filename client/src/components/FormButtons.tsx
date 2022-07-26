import { BUTTON_LABELS, BUTTON_TYPES, BUTTON_VARIANT } from '../constants/button'
import { ELEMENTS } from '../constants/component'
import Button from './Button'

type FormButtonsProps = JSX.IntrinsicElements[ELEMENTS.BUTTON] & {
	dirty: boolean
	isValid: boolean
	isSubmitting: boolean
	label: BUTTON_LABELS
}

const FormButtons = ({
	dirty,
	isValid,
	isSubmitting,
	label,
}: FormButtonsProps) => {
	return (
		<Button
			type={BUTTON_TYPES.SUBMIT}
			label={label}
			variant={BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED}
			disabled={!(isValid && dirty) || isSubmitting}
		/>
	)
}

export default FormButtons