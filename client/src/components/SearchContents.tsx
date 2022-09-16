import { CONTAINER_CLASS } from '../constants/component'
import { POST_CLASSES } from '../constants/post'
import Post, { PostType } from './Post'

type SearchContentProps = {
  data: {
    success: boolean
    posts?: PostType[] | []
    msg?: string
  }
}

const SearchContents = ({ data }: SearchContentProps) => {
	if (!data || !data.posts || !data.success) return <div>{POST_CLASSES.NO_POSTS}</div>

	return (
		<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
			{data.posts.map((post: PostType) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	)
}

export default SearchContents
