import ProfileHead from '../components/ProfileHead'
import SectionTitle from '../components/SectionTitle'
import UserPosts from '../components/UserPosts'
import { SECTION_TITLE } from '../constants/component'
import { DARK_CLASS, PAGE_CONTAINER_CLASS } from '../constants/pages'
import useAuth from '../hooks/useAuth'
import useQueryData from '../hooks/useQueryData'
import useTheme from '../hooks/useTheme'
import '../sass/pages/_profile.scss'

const Profile = () => {
	const { user, userId } = useAuth()
	const { profile } = useQueryData()
	const { isDark } = useTheme()

	return (
		<main
			className={
				isDark
					? `${PAGE_CONTAINER_CLASS.PROFILE} ${DARK_CLASS}`
					: `${PAGE_CONTAINER_CLASS.PROFILE}`
			}
		>
			<ProfileHead user={{ user: user ? user : profile[0][1].user }} />
			<SectionTitle title={SECTION_TITLE.POSTS} />
			<UserPosts userId={userId} />
		</main>
	)
}

export default Profile
