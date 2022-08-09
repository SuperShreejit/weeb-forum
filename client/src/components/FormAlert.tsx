import {
	SUCCESS_MESSAGE,
	ERROR_MESSAGE_CLASS,
	SUCCESS_MESSAGE_CLASS,
	FORM_ERRORS,
	ARIA_LIVE,
} from '../constants/forms'

type FormAlertProps = {
	id?: string
	errorMsg?: FORM_ERRORS | string
	successMsg?: SUCCESS_MESSAGE
}

const FormAlert = ({ errorMsg, successMsg, id }: FormAlertProps) => {
	if (errorMsg && id)
		return (
			<p className={ERROR_MESSAGE_CLASS} aria-live={ARIA_LIVE} id={id}>
				{errorMsg}
			</p>
		)
	else if (successMsg)
		return <p className={SUCCESS_MESSAGE_CLASS}>{successMsg}</p>
	else if (!id && errorMsg)
		return <p className={ERROR_MESSAGE_CLASS}>{errorMsg}</p>

	return null
}

export default FormAlert
