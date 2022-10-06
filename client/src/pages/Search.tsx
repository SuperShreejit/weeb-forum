import SearchContents from '../components/SearchContents'
import SearchForm from '../components/SearchForm'
import { PAGE_CONTAINER_CLASS } from '../constants/pages'
import { useState } from 'react'
import useSearch from '../hooks/useSearch'
import FormAlert from '../components/FormAlert'
import getError from '../helpers/getError'
import '../sass/pages/_search.scss'

const Search = () => {
	const [search, setSearch] = useState<string>('')

	const { data, error, isError, isSuccess } = useSearch({ search })

	if (isError || !data)
		return (
			<main className={PAGE_CONTAINER_CLASS.SEARCH}>
				<SearchForm setSearch={setSearch} search={search} />
				<FormAlert errorMsg={getError(error) as string} />
			</main>
		)

	if (isSuccess && data?.data.success === false)
		return (
			<main className={PAGE_CONTAINER_CLASS.SEARCH}>
				<SearchForm setSearch={setSearch} search={search} />
				<FormAlert errorMsg={data.data.msg} />
			</main>
		)

	return (
		<main className={PAGE_CONTAINER_CLASS.SEARCH}>
			<SearchForm setSearch={setSearch} search={search} />
			<SearchContents data={data.data} />
		</main>
	)
}

export default Search
