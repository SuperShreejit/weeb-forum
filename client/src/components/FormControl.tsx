import {
  FIELD_CONTROL_VARIANT,
	FIELD_CLASSES,
	FIELD_NAMES,
	FORM_CONTROL_CLASS,
	FORM_ERRORS,
	HINT_ID,
	LABELS,
	LABEL_CLASS,
	PLACEHOLDERS,
} from '../constants/forms'
import '../sass/components/_form_control.scss'
import FieldHint from './FieldHint'
import FieldInput from './FieldInput'
import FormAlert from './FormAlert'

type FormControlProps = JSX.IntrinsicElements['input'] & {
	variant: FIELD_CONTROL_VARIANT
	label: LABELS
	placeholder: PLACEHOLDERS
	name: FIELD_NAMES
	error: FORM_ERRORS | string | undefined
	touched: boolean | undefined
	hint?: string[]
	hintId?: HINT_ID
}

const FormControl = ({
	variant,
	label,
	name,
	touched,
	error,
	hint,
	hintId,
	...rest
}: FormControlProps) => {
	const errorId = `${name}-error`
  
	return (
		<div className={FORM_CONTROL_CLASS}>
			<label
				className={`${LABEL_CLASS} ${error ? FIELD_CLASSES.ERROR : ''} ${
					touched && !error ? FIELD_CLASSES.SUCCESS : ''
				}`}
				htmlFor={name}
			>
				{label}
			</label>
			<FieldInput
				type={variant}
				name={name}
				className={`${FIELD_CLASSES.TEXT} ${error ? FIELD_CLASSES.ERROR : ''} ${
					touched && !error ? FIELD_CLASSES.SUCCESS : ''
				}`}
				{...rest}
				aria-invalid={error ? true : false}
				aria-describedby={hint ? hintId : errorId}
			/>
			{touched && error && <FormAlert errorMsg={error} id={errorId} />}
			{hint && hintId && error && touched && (
				<FieldHint hint={hint} hintId={hintId} />
			)}
		</div>
	)
}

export default FormControl
