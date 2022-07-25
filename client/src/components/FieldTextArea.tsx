import {
	FIELD_CLASSES,
	TEXTAREA_COLS,
	TEXTAREA_ROWS,
	FORM_CONTROL_CLASS,
	LABEL_CLASS,
	LABELS,
} from '../constants/forms'
import FormAlert from './FormAlert'
import '../sass/components/_form_control.scss'

type FieldTextAreaProps = JSX.IntrinsicElements['textarea'] & {
	label: LABELS
	touched: boolean
	error: string
}

const FieldTextArea = ({
	name,
	placeholder,
	label,
	error,
	touched,
	...rest
}: FieldTextAreaProps) => {
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
			<textarea
				name={name}
				id={name}
				cols={TEXTAREA_COLS}
				rows={TEXTAREA_ROWS}
				className={`${FIELD_CLASSES.TEXT} ${error ? FIELD_CLASSES.ERROR : ''} ${
					touched && !error ? FIELD_CLASSES.SUCCESS : ''
				}`}
				{...rest}
				aria-invalid={error ? true : false}
				aria-describedby={errorId}
				{...rest}
			>
				{placeholder}
			</textarea>
			{touched && error && <FormAlert errorMsg={error} id={errorId} />}
		</div>
	)
}

export default FieldTextArea
