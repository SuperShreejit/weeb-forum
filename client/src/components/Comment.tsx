import { CONTAINER_CLASS } from '../constants/component'
import { ICON_BUTTON_VARIANT } from '../constants/iconButton'
import { PROFILE_IMAGE_CLASS } from '../constants/Image'
import { LINK_VARIANT } from '../constants/links'
import { PARAGRAPH_VARIANT } from '../constants/paragraph'
import { COMMENT_CLASSES, POST_CLASSES } from '../constants/post'
import { CLIENT_ROUTES } from '../constants/routes'
import generateImageSource from '../helpers/generateImageSource'
import useAuth from '../hooks/useAuth'
import { CommentType } from '../hooks/useViewPost'
import CommentMenu from './CommentMenu'
import IconButton from './IconButton'
import NavLink from './NavLink'
import Paragraph from './Paragraph'

type CommentProps = {
	comment: CommentType
}

const Comment = ({ comment }: CommentProps) => {
	const { userId } = useAuth()

	return (
		<div className={COMMENT_CLASSES.COMMENT}>
			<div className={CONTAINER_CLASS.FLEX}>
				<img
					className={PROFILE_IMAGE_CLASS}
					src={generateImageSource({
						buffer: comment.authorId.avatarId.avatar,
						mimeType: comment.authorId.avatarId.mimeType,
					})}
					alt={comment.authorId.name}
				/>
				<NavLink
					variant={LINK_VARIANT.CAPTION_LINK}
					label={comment.authorId.name}
					to={
						userId === comment.authorId.id
							? `${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.PROFILE}`
							: `${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.VIEW_USER}/${comment.authorId.id}`
					}
				/>
				{userId === comment.authorId.id && (
					<CommentMenu commentId={comment.id} />
				)}
			</div>
			<Paragraph text={comment.comment} variant={PARAGRAPH_VARIANT.REGULAR} />
			<div className={CONTAINER_CLASS.FLEX}>
				<div>
					<div className={COMMENT_CLASSES.COMMENT_LIKE}>
						<IconButton variant={ICON_BUTTON_VARIANT.LIKE} />
						{comment.likes}
					</div>
					<div className={COMMENT_CLASSES.COMMENT_DISLIKE}>
						<IconButton variant={ICON_BUTTON_VARIANT.DISLIKE} />
						{comment.dislikes}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Comment
