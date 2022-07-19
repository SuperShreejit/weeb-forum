import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './lib/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<App />
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>,
)
