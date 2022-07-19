import { configureStore } from '@reduxjs/toolkit'
import ThemeReducer from './features/theme.slice'
import AuthReducer from './features/auth.slice'

const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    auth: AuthReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch