import BGImage from "./BGImage"
import Info from "./Info"
import Navbar from "./Navbar"
import images from "../assets/images"
import { SIDEBAR_CLASS } from "../constants/component"


const Sidebar = () => {
  return (
    <aside className={SIDEBAR_CLASS}>
      <BGImage source={images.sidebarImg} />
      <Navbar />
      <Info/>
    </aside>
  )
}

export default Sidebar