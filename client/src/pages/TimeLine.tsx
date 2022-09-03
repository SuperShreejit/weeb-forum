import FormAlert from '../components/FormAlert'
import Post from '../components/Post'
import { PAGE_CONTAINER_CLASS, DARK_CLASS } from '../constants/pages'
import getError from '../helpers/getError'
import useTheme from '../hooks/useTheme'
import useTimeline from '../hooks/useTimeline'
import Loading from './../components/Loading'

const TimeLine = () => {
	const { data, error, isError, isLoading, isSuccess } = useTimeline()
	const { isDark } = useTheme()

	if (isLoading)
		return (
			<main className={PAGE_CONTAINER_CLASS.TIMELINE}>
				<Loading />
			</main>
		)

	if (
		isError ||
		(isSuccess && typeof data !== 'string' && data?.data.success === false)
	)
		return (
			<main className={PAGE_CONTAINER_CLASS.TIMELINE}>
				{isError && <FormAlert errorMsg={getError(error) as string} />}
				{isSuccess &&
					typeof data !== 'string' &&
					data?.data.success === false && (
						<FormAlert errorMsg={data?.data.msg} />
					)}
			</main>
		)

	return (
		<main
			className={
				isDark
					? `${PAGE_CONTAINER_CLASS.TIMELINE} ${DARK_CLASS}`
					: `${PAGE_CONTAINER_CLASS.TIMELINE}`
			}
		>
			{isSuccess &&
				typeof data !== 'string' &&
				data?.data.success &&
				data.data.posts.map(post => <Post key={post.id} post={post} />)}
		</main>
	)
}

export default TimeLine
