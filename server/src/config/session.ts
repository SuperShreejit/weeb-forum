import MongoStore from 'connect-mongo'
import { mongoURI } from './connectDB'

const sessionStore = new MongoStore({
	collectionName: 'sessions',
	mongoUrl: mongoURI,
})

const sessionOptions = {
	secret: process.env.SESSION_SECRET as string,
	resave: false,
	saveUninitialized: true,
	store: sessionStore,
	cookie: {
		httpOnly: true,
		maxAge: 1000 * 3600 * 24,
	},
}

export default sessionOptions