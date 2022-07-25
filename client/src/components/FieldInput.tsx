import {
	FIELD_CLASSES,
} from '../constants/forms'

type FieldInputProps = JSX.IntrinsicElements['input']

const FieldInput = ({ name, ...rest }: FieldInputProps) => {
	return <input className={FIELD_CLASSES.TEXT} name={name} id={name} {...rest} />
}

export default FieldInput
