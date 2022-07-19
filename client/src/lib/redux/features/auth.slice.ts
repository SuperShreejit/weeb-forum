import { createSlice } from '@reduxjs/toolkit'
import { SLICES } from '../../../constants/redux'

const initialState = {
	isAuth: false,
	userId: '',
}

export type AuthState = {
	isAuth: boolean
	userId: string
}

const AuthSlice = createSlice({
	name: SLICES.AUTH,
	initialState,
	reducers: {
		logoutUser: (state: AuthState) => {
			state.isAuth = false
			state.userId = ''
		},
	},
})

export const { logoutUser } = AuthSlice.actions
export default AuthSlice.reducer
