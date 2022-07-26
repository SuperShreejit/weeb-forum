import React from 'react'
import images from '../assets/images'
import BGImage from '../components/BGImage'
import Header from '../components/Header'
import RegisterAlternate from '../components/RegisterAlternate'
import RegisterForm from '../components/RegisterForm'
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import { IMAGE } from '../constants/Image'
import { PAGE_CONTAINER_CLASS } from '../constants/pages'
import '../sass/pages/_register.scss'

const Register = () => {
  return (
		<main className={PAGE_CONTAINER_CLASS.REGISTER}>
			<Header text={HEADERS.SIGN_IN} variant={HEADER_VARIANT.PRIMARY_H2} />
			<RegisterForm />
			<RegisterAlternate />
			<BGImage name={IMAGE.AUTH} source={images.AuthImg} />
		</main>
	)
}

export default Register