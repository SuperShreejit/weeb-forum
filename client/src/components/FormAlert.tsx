import {
	SUCCESS_MESSAGE,
	ERROR_MESSAGE_CLASS,
	SUCCESS_MESSAGE_CLASS,
	FORM_ERRORS,
	ARIA_LIVE,
} from '../constants/forms'

type FormAlertProps = {
	id: string
	errorMsg?: FORM_ERRORS | string
	successMsg?: SUCCESS_MESSAGE | string
}

const FormAlert = ({ errorMsg, successMsg, id }: FormAlertProps) => {
	if (!successMsg)
		return (
			<p className={ERROR_MESSAGE_CLASS} aria-live={ARIA_LIVE} id={id}>
				{errorMsg}
			</p>
		)
	else if (!errorMsg)
		return (
			<p className={SUCCESS_MESSAGE_CLASS} aria-live={ARIA_LIVE} id={id}>
				{successMsg}
			</p>
		)

	return null
}

export default FormAlert
