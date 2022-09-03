import ProfileHead from '../components/ProfileHead'
import SectionTitle from '../components/SectionTitle'
import UserPosts from '../components/UserPosts'
import { SECTION_TITLE } from '../constants/component'
import { PAGE_CONTAINER_CLASS } from '../constants/pages'
import useAuth from '../hooks/useAuth'
import useQueryData from '../hooks/useQueryData'
import '../sass/pages/_profile.scss'

const Profile = () => {
	const { user, userId } = useAuth()
	const { profile } = useQueryData()

	return (
		<main className={PAGE_CONTAINER_CLASS.PROFILE}>
			<ProfileHead user={{ user: user ? user : profile[0][1].user }} />
			<SectionTitle title={SECTION_TITLE.POSTS} />
			<UserPosts userId={userId} />
		</main>
	)
}

export default Profile
