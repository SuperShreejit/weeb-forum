import { FIELD_HINT_CLASS, FIELD_HINTS, HINT_ID } from '../constants/forms'
import { PARAGRAPH_VARIANT } from '../constants/paragraph'
import Paragraph from './Paragraph'
import { FaInfo } from 'react-icons/fa'
import { HINT_ICON_SIZE } from '../constants/component'

type FieldHintProps = { hint: FIELD_HINTS, hintId: HINT_ID }

const FieldHint = ({ hint, hintId }: FieldHintProps) => {
	return (
		<div className={FIELD_HINT_CLASS}>
			<FaInfo size={HINT_ICON_SIZE} />
			<Paragraph text={hint} variant={PARAGRAPH_VARIANT.REGULAR} id={hintId} />
		</div>
	)
}

export default FieldHint
