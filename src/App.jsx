/**
 * 
 * /src/App.jsx
 * sets up the main structure (order) for the app and routes/pages
 * 
 */

import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage'
import './App.scss'

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="app">
					<header className="app-header">
						<h1>GitHub Repository Browser</h1>
					</header>

					<main className="app-main">
						<Routes>
							<Route
								path="/"
								element={<SearchPage />}
							/>
						</Routes>
					</main>

				</div>
			</Router>
		</Provider>
	);
}

export default App;
