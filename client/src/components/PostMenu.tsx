import { SUCCESS_MESSAGE } from '../constants/forms'
import { ICON_BUTTON_VARIANT } from '../constants/iconButton'
import { POST_CLASSES, POST_MENU_OPTIONS } from '../constants/post'
import getError from '../helpers/getError'
import usePostMenu from '../hooks/usePostMenu'
import FormAlert from './FormAlert'
import IconButton from './IconButton'

const PostMenu = ({ postId }: { postId: string }) => {
	const {
		dropdown,
		handleDropdown,
		editPost,
		mutate: removePost,
		data,
		error,
		isError,
		isSuccess,
	} = usePostMenu()

	return (
		<>
			<IconButton
				variant={ICON_BUTTON_VARIANT.OPTIONS}
				onClick={handleDropdown}
			/>
			<div
				className={
					dropdown
						? `${POST_CLASSES.POST_MENU}`
						: `${POST_CLASSES.POST_MENU} ${POST_CLASSES.POST_MENU_HIDE}`
				}
			>
				<div
					className={POST_CLASSES.POST_MENU_OPTION}
					onClick={() => editPost(postId)}
				>
					{POST_MENU_OPTIONS.EDIT_POST}
				</div>
				<div
					className={`${POST_CLASSES.POST_MENU_OPTION} ${POST_CLASSES.POST_MENU_DELETE_OPTION}`}
					onClick={() => removePost(postId)}
				>
					{POST_MENU_OPTIONS.REMOVE_POST}
				</div>
				{isError && <FormAlert errorMsg={getError(error) as string} />}
				{isSuccess && typeof data !== 'string' && !data.data.success && (
					<FormAlert errorMsg={data.data.msg} />
				)}
				{isSuccess && typeof data !== 'string' && data.data.success && (
					<FormAlert successMsg={SUCCESS_MESSAGE.DELETE_POST} />
				)}
			</div>
		</>
	)
}

export default PostMenu
