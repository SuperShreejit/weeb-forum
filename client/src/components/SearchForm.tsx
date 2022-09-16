import { useFormik } from 'formik'
import { useCallback, SetStateAction, Dispatch } from 'react'
import {
	BUTTON_LABELS,
	BUTTON_TYPES,
	BUTTON_VARIANT,
} from '../constants/button'
import {
	FIELD_CONTROL_VARIANT,
	FIELD_NAMES,
	FORM_CLASS,
	LABELS,
	PLACEHOLDERS,
} from '../constants/forms'
import {
	SearchDataType,
	searchValidationSchema,
} from '../validations/search'
import Button from './Button'
import FormControl from './FormControl'

type SearchFormProps = {
	setSearch: Dispatch<SetStateAction<string>>
	search: string
}

const SearchForm = ({ setSearch, search }: SearchFormProps) => {
	const onSubmit = useCallback(
		(data: SearchDataType) => setSearch(data.search),
		[setSearch],
	)

	const { handleSubmit, errors, touched, getFieldProps } = useFormik({
		initialValues: { search },
		onSubmit,
		validationSchema: searchValidationSchema,
	})

	return (
		<form className={FORM_CLASS} onSubmit={handleSubmit}>
			<FormControl
				error={errors.search}
				label={LABELS.SEARCH}
				placeholder={PLACEHOLDERS.SEARCH}
				touched={touched.search}
				variant={FIELD_CONTROL_VARIANT.TEXT}
				{...getFieldProps(FIELD_NAMES.SEARCH)}
				name={FIELD_NAMES.SEARCH}
			/>

			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.SEARCH}
				variant={BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED}
			/>
		</form>
	)
}

export default SearchForm
