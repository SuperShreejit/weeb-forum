import BGImage from './BGImage'
import Info from './Info'
import Navbar from './Navbar'
import images from '../assets/images'
import { SIDEBAR_CLASS } from '../constants/component'
import { IMAGE } from '../constants/Image'
import '../sass/components/_sidebar.scss'

const Sidebar = () => {
	return (
		<aside className={SIDEBAR_CLASS}>
			<BGImage source={images.sidebarImg} name={IMAGE.SIDEBAR} />
			<Navbar />
			<Info />
		</aside>
	)
}

export default Sidebar
