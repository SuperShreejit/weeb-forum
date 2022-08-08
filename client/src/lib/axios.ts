import axios from 'axios'
import { SERVER_ROUTES } from '../constants/routes'

const axiosServer = axios.create({
  baseURL: SERVER_ROUTES.SERVER_BASE + SERVER_ROUTES.SERVER_URL_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosServer