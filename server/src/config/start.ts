import { Express } from 'express-serve-static-core'
import connectDB from './connectDB'
import getError from '../helpers/getError'

const start = async (app: Express) => {
	try {
		const port = process.env.PORT
		app.listen(port, () => console.log('App listening on port ' + port))
		await connectDB()
		console.log('MongoDB connected!')
	} catch (error) {
		console.error(getError(error))
	}
}

export default start
