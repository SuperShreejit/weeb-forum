import { useFormik } from 'formik'
import React, { useCallback } from 'react'
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
	SUCCESS_MESSAGE,
} from '../constants/forms'
import getError from '../helpers/getError'
import useSearch from '../hooks/useSearch'
import {
	SearchDataType,
	searchInitialValues,
	searchValidationSchema,
} from '../validations/search'
import Button from './Button'
import FormAlert from './FormAlert'
import FormControl from './FormControl'

const SearchForm = () => {
	const onSubmit = useCallback((data: SearchDataType) => {}, [])

	const {
		handleSubmit,
		dirty,
		isValid,
		errors,
		touched,
		getFieldProps,
		values,
	} = useFormik({
		initialValues: searchInitialValues,
		onSubmit,
		validationSchema: searchValidationSchema,
	})

	const { isError, error, isLoading, isSuccess, data } = useSearch(values)

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

			{isError && <FormAlert errorMsg={getError(error) as string} />}
			{isSuccess &&
				typeof data !== 'string' &&
				data?.data.success === false && <FormAlert errorMsg={data?.data.msg} />}

			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.SEARCH}
				variant={BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED}
				disabled={
					!(isValid && dirty) ||
					isLoading ||
					(typeof data !== 'string' && isSuccess && data?.data.success)
				}
			/>
		</form>
	)
}

export default SearchForm
