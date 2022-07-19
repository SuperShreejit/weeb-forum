import { createSlice } from '@reduxjs/toolkit'
import { SLICES } from '../../../constants/redux'

const initialState = {
	isDark: false,
}

export type ThemeState = { isDark: boolean }

const ThemeSlice = createSlice({
	name: SLICES.THEME,
	initialState,
	reducers: {
		switchTheme: (state: ThemeState) => {
			state.isDark = !state.isDark
		},
	},
})

export const { switchTheme } = ThemeSlice.actions

export default ThemeSlice.reducer