import { useParams } from 'react-router'
import Comments from '../components/Comments'
import Post from '../components/Post'
import { DARK_CLASS, PAGE_CONTAINER_CLASS } from '../constants/pages'
import useTheme from '../hooks/useTheme'
import useViewPost from '../hooks/useViewPost'
import { useMemo } from 'react'
import FormAlert from '../components/FormAlert'

const ViewPost = () => {
  const { isDark } = useTheme()
	const { postId } = useParams()
  const { data, error, isError, isSuccess } = useViewPost(postId)

  if (!data || isError || typeof data === 'string') return (
    <main
			className={
				isDark
					? `${PAGE_CONTAINER_CLASS.VIEW_POST} ${DARK_CLASS}`
					: PAGE_CONTAINER_CLASS.VIEW_POST
			}
		>
			<FormAlert errorMsg={error as string} />
		</main>
  )

  if (data.data.success === false) return (
    <main
			className={
				isDark
					? `${PAGE_CONTAINER_CLASS.VIEW_POST} ${DARK_CLASS}`
					: PAGE_CONTAINER_CLASS.VIEW_POST
			}
		>
			<FormAlert errorMsg={data.data.msg} />
		</main>
  )

  
	return (
		<main
			className={
				isDark
					? `${PAGE_CONTAINER_CLASS.VIEW_POST} ${DARK_CLASS}`
					: PAGE_CONTAINER_CLASS.VIEW_POST
			}
		>
			<Post post={data.data.success === true && data.data.post} />
			<Comments comments={postData?.comments} />
		</main>
	)
}

export default ViewPost
