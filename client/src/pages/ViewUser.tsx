import { useParams } from 'react-router'
import FormAlert from '../components/FormAlert'
import Loading from '../components/Loading'
import ProfileHead from '../components/ProfileHead'
import SectionTitle from '../components/SectionTitle'
import UserPosts from '../components/UserPosts'
import { SECTION_TITLE } from '../constants/component'
import { DARK_CLASS, PAGE_CONTAINER_CLASS } from '../constants/pages'
import getError from '../helpers/getError'
import useTheme from '../hooks/useTheme'
import useViewUser from '../hooks/useViewUser'
import '../sass/pages/_view-user.scss'

const ViewUser = () => {
	const { userId } = useParams()
	const { data, error, isError, isLoading } = useViewUser(userId as string)
	const { isDark } = useTheme()

	if (isLoading)
		return (
			<main
				className={
					isDark
						? `${PAGE_CONTAINER_CLASS.VIEW_USER} ${DARK_CLASS}`
						: `${PAGE_CONTAINER_CLASS.VIEW_USER}`
				}
			>
				<Loading />
			</main>
		)

	if (!data || isError || typeof data === 'string')
		return (
			<main
				className={
					isDark
						? `${PAGE_CONTAINER_CLASS.VIEW_USER} ${DARK_CLASS}`
						: `${PAGE_CONTAINER_CLASS.VIEW_USER}`
				}
			>
				<FormAlert errorMsg={getError(error) as string} />
			</main>
		)

	if (data.data.success === false)
		return (
			<main
				className={
					isDark
						? `${PAGE_CONTAINER_CLASS.VIEW_USER} ${DARK_CLASS}`
						: `${PAGE_CONTAINER_CLASS.VIEW_USER}`
				}
			>
				<FormAlert errorMsg={data.data.msg} />
			</main>
		)

	return (
		<main
			className={
				isDark
					? `${PAGE_CONTAINER_CLASS.VIEW_USER} ${DARK_CLASS}`
					: `${PAGE_CONTAINER_CLASS.VIEW_USER}`
			}
		>
			<ProfileHead user={{ user: data?.data.user }} />
			<SectionTitle title={SECTION_TITLE.POSTS} />
			<UserPosts userId={userId as string} />
		</main>
	)
}

export default ViewUser
