import { ELEMENTS } from '../constants/component'
import {
	FIELD_CLASSES,
} from '../constants/forms'

type FieldInputProps = JSX.IntrinsicElements[ELEMENTS.INPUT]

const FieldInput = ({ name, ...rest }: FieldInputProps) => {
	return <input className={FIELD_CLASSES.TEXT} name={name} id={name} {...rest} />
}

export default FieldInput
