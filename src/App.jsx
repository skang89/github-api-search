/**
 * 
 * /src/App.jsx
 * sets up the main structure (order) for the app and routes/pages
 * 
 */

import { Provider } from 'react-redux';
import { store } from './store';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
	return (
		<Provider store={store}>
			<div className="app">
				<header className="app-header">
					<h1>GitHub Repository Browser</h1>
				</header>

				<main className="app-main">
					<div className="search-section">
						<SearchBar />
					</div>
				</main>

			</div>
		</Provider>
	);
}

export default App;
