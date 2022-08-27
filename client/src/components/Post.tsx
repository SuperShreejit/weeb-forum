import { useMemo } from 'react'
import { ICON_BUTTON_VARIANT } from '../constants/iconButton'
import { PROFILE_IMAGE_CLASS } from '../constants/Image'
import { LINKS, LINK_VARIANT } from '../constants/links'
import { PARAGRAPH_VARIANT } from '../constants/paragraph'
import { POST_CLASSES } from '../constants/post'
import { CLIENT_ROUTES } from '../constants/routes'
import generateImageSource from '../helpers/generateImageSource'
import useAuth from '../hooks/useAuth'
import AddComment from './AddComment'
import IconButton from './IconButton'
import NavLink from './NavLink'
import Paragraph from './Paragraph'
import PostMenu from './PostMenu'

type PostType = {
	id: string
	authorId: {
		id: string
		name: string
		avatarId: {
			id: string
			filename: string
			mimeType: string
			avatar: string
		}
	}
	title: string
	post: string
	keys: string[]
	likes: number
	likers: string[]
	dislikes: number
	dislikers: string[]
	commentCount: number
	comments: {
		id: string
		postId: string
		authorId: {
			id: string
			name: string
			avatarId: {
				id: string
				filename: string
				mimeType: string
				avatar: string
			}
		}
		comment: string
		likes: number
		likers: string[]
		dislikes: number
		dislikers: string[]
	}
}

const Post = ({ post }: { post: PostType }) => {
	const { userId } = useAuth()

	const image = useMemo(() => {
		return {
			mimeType: post.authorId.avatarId.mimeType,
			buffer: post.authorId.avatarId.avatar,
		}
	}, [post])

	return (
		<div className={POST_CLASSES.POST}>
			<div className={POST_CLASSES.POST_TOP}>
				<div>
					<img
						className={PROFILE_IMAGE_CLASS}
						src={generateImageSource(image)}
						alt={post.authorId.name}
					/>
					<NavLink
						variant={LINK_VARIANT.CAPTION_LINK}
						label={post.authorId.name}
						to={
							userId === post.authorId.id
								? `${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.PROFILE}`
								: `${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.VIEW_USER}/${post.authorId.id}`
						}
					/>
          {userId === post.authorId.id && <PostMenu postId={post.id} />}
				</div>
			</div>
			<div className={POST_CLASSES.POST_BODY}>
				<Paragraph text={post.title} variant={PARAGRAPH_VARIANT.CAPTION} />
				<Paragraph text={post.post} variant={PARAGRAPH_VARIANT.REGULAR} />
				<ul className={POST_CLASSES.POST_KEYS}>
					{post.keys.map((tag: string, i) => (
						<li key={i}>{tag}</li>
					))}
				</ul>
			</div>
			<div className={POST_CLASSES.POST_BOTTOM}>
				<div className={POST_CLASSES.POST_INFO}>
					<div>
						<div className={POST_CLASSES.POST_LIKE}>
							<IconButton variant={ICON_BUTTON_VARIANT.LIKE} />
							{post.likes}
						</div>
						<div className={POST_CLASSES.POST_DISLIKE}>
							<IconButton variant={ICON_BUTTON_VARIANT.DISLIKE} />
							{post.dislikes}
						</div>
						<div className={POST_CLASSES.POST_COMMENT}>
							<IconButton variant={ICON_BUTTON_VARIANT.COMMENT} />
							{post.commentCount}
						</div>
						<NavLink
							label={LINKS.VIEW_FULL_POST}
							variant={LINK_VARIANT.REGULAR_SECONDARY}
							to={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.VIEW_POST}/${post.id}}`}
						/>
					</div>
				</div>
				<AddComment postId={post.id} userId={userId} />
			</div>
		</div>
	)
}

export default Post
