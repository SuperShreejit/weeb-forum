import { FIELD_HINT_CLASS,  HINT_ID } from '../constants/forms'
import { FaInfo } from 'react-icons/fa'
import { HINT_ICON_SIZE } from '../constants/component'

type FieldHintProps = { hint: string[]; hintId: HINT_ID }

const FieldHint = ({ hint, hintId }: FieldHintProps) => {
	return (
		<div className={FIELD_HINT_CLASS} id={hintId}>
			<FaInfo size={HINT_ICON_SIZE} />
			<ul>
				{hint.map((text: string, i: number) => (
					<li key={i}>{text}</li>
				))}
			</ul>
		</div>
	)
}

export default FieldHint
