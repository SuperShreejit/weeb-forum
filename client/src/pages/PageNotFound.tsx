import images from "../assets/images"
import BGImage from "../components/BGImage"
import Button from "../components/Button"
import Header from "../components/Header"
import { BUTTON_LABELS, BUTTON_VARIANT } from "../constants/button"
import { CONTAINER_CLASS } from "../constants/component"
import { HEADERS, HEADER_VARIANT } from "../constants/header"
import { IMAGE } from "../constants/Image"
import { PAGE_CONTAINER_CLASS } from "../constants/pages"
import useNavigation from "../hooks/useNavigations"
import '../sass/pages/_page-not-found.scss'

const PageNotFound = () => {
  const {goBack} = useNavigation()
  return (
    <main className={PAGE_CONTAINER_CLASS.PAGE_NOT_FOUND}>
      <div className={CONTAINER_CLASS.FLEX_VERITICAL}>
      <Header text={HEADERS.PAGE_NOT_FOUND} variant={HEADER_VARIANT.PRIMARY_H2} />
      <Button label={BUTTON_LABELS.BACK} variant={BUTTON_VARIANT.PRIMARY_BORDER_ROUNDED} onClick={goBack} />
      </div>
      <BGImage name={IMAGE.NOT_FOUND} source={images.NotFoundImg} />
    </main>
  )
}

export default PageNotFound