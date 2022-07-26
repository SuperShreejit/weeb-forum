import images from "../assets/images"
import BGImage from "../components/BGImage"
import Header from "../components/Header"
import LoginAlternate from "../components/LoginAlternate"
import LoginForm from "../components/LoginForm"
import { HEADERS, HEADER_VARIANT } from "../constants/header"
import { IMAGE } from "../constants/Image"
import { PAGE_CONTAINER_CLASS } from "../constants/pages"

const Login = () => {
  return (
    <main className={PAGE_CONTAINER_CLASS.LOGIN}>
      <Header text={HEADERS.SIGN_IN} variant={HEADER_VARIANT.PRIMARY_H2} />
      <LoginForm />
      <LoginAlternate />
      <BGImage name={IMAGE.AUTH} source={images.AuthImg} />
    </main>
  )
}

export default Login