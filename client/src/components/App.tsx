import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CLIENT_ROUTES } from '../constants/routes'
import PageNotFound from '../pages/PageNotFound'
import Forbidden from '../pages/Forbidden'
import Landing from '../pages/Landing'
import Register from '../pages/Register'
import Login from '../pages/Login'
import VerifyEmail from '../pages/VerifyEmail'
import ForgotPassword from '../pages/ForgotPassword'
import Authentication from './Authentication'
import CreatePost from '../pages/CreatePost'
import ViewPost from '../pages/ViewPost'
import EditPost from '../pages/EditPost'
import TimeLine from '../pages/TimeLine'
import Profile from '../pages/Profile'
import UserSettings from '../pages/UserSettings'
import Search from '../pages/Search'
import Notifications from '../pages/Notifications'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import TermsConditions from '../pages/TermsConditions'
import PublicLayout from '../pages/PublicLayout'

const App = () => (
	<Router>
		<Routes>
			<Route path={CLIENT_ROUTES.AUTH_BASE} element={<Authentication />}>
				<Route path={CLIENT_ROUTES.CREATE_POST} element={<CreatePost />} />
				<Route path={CLIENT_ROUTES.VIEW_POST} element={<ViewPost />} />
				<Route path={CLIENT_ROUTES.EDIT_POST} element={<EditPost />} />
				<Route path={CLIENT_ROUTES.TIMELINE} element={<TimeLine />} />
				<Route path={CLIENT_ROUTES.PROFILE} element={<Profile />} />
				<Route path={CLIENT_ROUTES.SETTINGS} element={<UserSettings />} />
				<Route path={CLIENT_ROUTES.SEARCH} element={<Search />} />
				<Route path={CLIENT_ROUTES.NOTIFICATIONS} element={<Notifications />} />
				<Route path={CLIENT_ROUTES.FORBIDDEN_AUTH} element={<Forbidden />} />
				<Route path={CLIENT_ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
			</Route>

			<Route element={<PublicLayout />}>
				<Route path={CLIENT_ROUTES.LANDING} element={<Landing />} />
				<Route path={CLIENT_ROUTES.REGISTER} element={<Register />} />
				<Route path={CLIENT_ROUTES.LOGIN} element={<Login />} />
				<Route path={CLIENT_ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
				<Route
					path={CLIENT_ROUTES.FORGOT_PASSWORD}
					element={<ForgotPassword />}
				/>
				<Route
					path={CLIENT_ROUTES.PRIVACY_POLICY}
					element={<PrivacyPolicy />}
				/>
				<Route
					path={CLIENT_ROUTES.TERMS_CONDITIONS}
					element={<TermsConditions />}
				/>
				<Route path={CLIENT_ROUTES.FORBIDDEN} element={<Forbidden />} />
				<Route path={CLIENT_ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
			</Route>
			
		</Routes>
	</Router>
)

export default App
