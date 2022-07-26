import { LOADING_TEXT } from '../constants/component'
import { PARAGRAPH_VARIANT } from '../constants/paragraph'
import Paragraph from './Paragraph'

const Loading = () => (
	<Paragraph variant={PARAGRAPH_VARIANT.CAPTION} text={LOADING_TEXT} />
)

export default Loading
