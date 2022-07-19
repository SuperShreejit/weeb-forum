export default () => {
	let otp = ''
	for (let i = 0; i < 4; i++) {
		const num = Math.floor(Math.random() * 10)
		otp += num
	}
	return otp
}