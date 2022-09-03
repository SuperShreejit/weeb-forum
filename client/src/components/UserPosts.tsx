import { CONTAINER_CLASS } from '../constants/component'
import getError from '../helpers/getError'
import useUserPosts from '../hooks/useUserPosts'
import FormAlert from './FormAlert'
import Loading from './Loading'
import Post from './Post'

type UserPostsProps = {
	userId: string
}

const UserPosts = ({ userId }: UserPostsProps) => {
	const { data, isError, isLoading, isSuccess, error } = useUserPosts(userId)

	if (isLoading)
		return (
			<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
				<Loading />
			</div>
		)

	if (
		isError ||
		(isSuccess && typeof data !== 'string' && data?.data.success === false)
	)
		return (
			<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
				{isError && <FormAlert errorMsg={getError(error) as string} />}
				{isSuccess &&
					typeof data !== 'string' &&
					data?.data.success === false && (
						<FormAlert errorMsg={data?.data.msg} />
					)}
			</div>
		)

	return (
		<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
			{isSuccess &&
				typeof data !== 'string' &&
				data?.data.success &&
				data.data.posts.map(post => <Post key={post.id} post={post} />)}
		</div>
	)
}

export default UserPosts
