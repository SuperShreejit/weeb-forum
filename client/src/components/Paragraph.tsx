import '../sass/components/_paragraphs.scss'
import {
	PARAGRAPHS,
	PARAGRAPH_CLASS,
	CAPTION_CLASS,
	PARAGRAPH_VARIANT,
} from '../constants/paragraph'
import { ELEMENTS } from '../constants/component';

type ParagraphProps = JSX.IntrinsicElements[ELEMENTS.PARAGRAPH] & { variant: PARAGRAPH_VARIANT; text: PARAGRAPHS | string }

const Paragraph = ({ variant, text }: ParagraphProps) => {
	switch (variant) {
		case PARAGRAPH_VARIANT.CAPTION:
			return <p className={CAPTION_CLASS}>{text}</p>
		case PARAGRAPH_VARIANT.REGULAR:
			return <p className={PARAGRAPH_CLASS}>{text}</p>
		default:
			return null
	}
}

export default Paragraph
