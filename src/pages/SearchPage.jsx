/**
 * 
 * src/pages/SearchPage.jsx
 * Search Page UI 
 * 
 */

import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import RepositoryCard from '../components/RepositoryCard/RepositoryCard';

const SearchPage = () => {

	// Access search state from Redux store
	const { items, loading, error, searchQuery } = useSelector(state => {
		return state.repositories;
	});

	const showNoResults = !loading && searchQuery && items.length === 0 && !error;
	const showGetStarted = !loading && !searchQuery && items.length === 0 && !error;

	return (
		<div className='search-container'>
			<div className="search-section">
				<SearchBar />
				<FilterPanel />
			</div>

			<div className="repositories-container">
				{items.map(repo => {
					return (
						<RepositoryCard key={repo.id} repository={repo} />
					);
				})}

				{items.length > 0 && console.log('✅ All repository cards rendered successfully')}
			</div>

			{showNoResults && (
				<div className="search-no-results">
					<h3>Oops! No search results found.</h3>
					<p>Please try again with different keywords or adjust your filters!</p>
				</div>
			)}

			{showGetStarted && (
				<div className="search-no-results">
					<p>Search for repositories to get started!</p>
				</div>
			)}
		</div>

	);
};

export default SearchPage;
