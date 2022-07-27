import React from 'react'
import images from '../assets/images'
import BGImage from '../components/BGImage'
import Header from '../components/Header'
import RegisterAlternate from '../components/RegisterAlternate'
import RegisterForm from '../components/RegisterForm'
import { CONTAINER_CLASS } from '../constants/component'
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import { IMAGE } from '../constants/Image'
import { PAGE_CONTAINER_CLASS } from '../constants/pages'
import '../sass/pages/_register.scss'

const Register = () => {
	return (
		<main className={PAGE_CONTAINER_CLASS.REGISTER}>
			<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
				<Header text={HEADERS.SIGN_UP} variant={HEADER_VARIANT.PRIMARY_H2} />
				<RegisterForm />
				<RegisterAlternate />
			</div>
			<BGImage name={IMAGE.AUTH} source={images.AuthImg} />
		</main>
	)
}

export default Register
