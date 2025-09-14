/**
 * 
 * src/components/FilterPanel/FilterPanel.jsx
 * Filters Component
 * 
 */

import { useDispatch, useSelector } from 'react-redux';
import { setFilters, searchRepositories } from '../../store/repositoriesSlice';

const FilterPanel = () => {

	const dispatch = useDispatch();

	// Get current filters and search query from Redux store
	const { filters, searchQuery } = useSelector(state => {
		return state.repositories;
	});

	const starRangeOptions = [
		{ value: '', label: 'All Star Counts', description: 'No star count filtering' },
		{ value: 'stars:<1000', label: 'Under 1K stars', description: 'Repositories with less than 1,000 stars' },
		{ value: 'stars:1000..4999', label: '1K - 5K stars', description: 'Repositories with stars between 1k and 4,999k' },
		{ value: 'stars:5000..9999', label: '5K - 10K stars', description: 'Repositories with stars between 5k and 9,999k' },
		{ value: 'stars:10000..24999', label: '10K - 25K stars', description: 'Repositories with stars between 10k and 24,999k' },
		{ value: 'stars:25000..49999', label: '25K - 50K stars', description: 'Repositories with stars between 25k and 49,999k' },
		{ value: 'stars:>=50000', label: '50K+ stars', description: 'Repositories with more than 50k stars' }
	];

	const handleFilterChange = (key, value) => {
		// Create new filters object with the updated value
		const newFilters = { ...filters, [key]: value };

		console.log('Updating filters:', newFilters);

		// Update filters in Redux store
		dispatch(setFilters(newFilters));

		// automatically re-search with new filters if we already have a search query
		if (searchQuery) {
			dispatch(searchRepositories({
				query: searchQuery,
				filters: newFilters
			}));
		}
	};

	const getCurrentStarRangeLabel = () => {
		const option = starRangeOptions.find(opt => opt.value === filters.starRange);
		const label = option ? option.label : 'All Star Counts';

		return label;
	};

	// Log filters state
	console.log('filters state:', {
		language: filters.language || 'All Languages',
		starRange: getCurrentStarRangeLabel(),
		sortBy: filters.sort,
	});

	return (
		<div className="filter-panel">
			<div className="filter-row">

				<div className="filter-group">
					<label htmlFor="language-filter">Programming Language:</label>
					<select
						id="language-filter"
						value={filters.language}
						onChange={(e) => {
							handleFilterChange('language', e.target.value);
						}}
					>
						<option value="">All Languages</option>
						<option value="JavaScript">JavaScript</option>
						<option value="TypeScript">TypeScript</option>
						<option value="Python">Python</option>
						<option value="Java">Java</option>
						<option value="Go">Go</option>
						<option value="Rust">Rust</option>
						<option value="C++">C++</option>
						<option value="C#">C#</option>
						<option value="PHP">PHP</option>
						<option value="Ruby">Ruby</option>
					</select>
				</div>

				<div className="filter-group">
					<label htmlFor="star-range-filter">Filter by Stars:</label>
					<select
						id="star-range-filter"
						value={filters.starRange}
						onChange={(e) => {
							handleFilterChange('starRange', e.target.value);
						}}
						title="Filter repositories by their star count"
					>
						{starRangeOptions.map((option) => {
							return (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							);
						})}
					</select>
				</div>

				<div className="filter-group">
					<label htmlFor="sort-filter">Sort Results By:</label>
					<select
						id="sort-filter"
						value={filters.sort}
						onChange={(e) => {
							handleFilterChange('sort', e.target.value);
						}}
					>
						<option value="stars">Stars (Most Popular)</option>
						<option value="forks">Forks (Most Forked)</option>
						<option value="updated">Recently Updated</option>
						<option value="created">Recently Created</option>
					</select>
				</div>
			</div>

			{(filters.language || filters.starRange) && (
				<div className="active-filters">
					<h4>Active Filters:</h4>

					<div className="filter-tags">
						{filters.language && (
							<span className="filter-tag language-tag">
								Language: {filters.language}
								<button
									onClick={() => {
										handleFilterChange('language', '');
									}}
									aria-label="Remove language filter"
									className="remove-tag"
								>
									X
								</button>
							</span>
						)}

						{filters.starRange && (
							<span className="filter-tag star-range-tag">
								Stars: {getCurrentStarRangeLabel()}
								<button
									onClick={() => {
										handleFilterChange('starRange', '');
									}}
									aria-label="Remove star range filter"
									className="remove-tag"
								>
									X
								</button>
							</span>
						)}
					</div>

					<button
						type="button"
						className="filter-clear-all"
						onClick={() => {
							// Create filter object with cleared values
							const clearedFilters = {
								...filters,
								language: '',
								starRange: ''
							};
							dispatch(setFilters(clearedFilters));

							// re-run active search with cleared filters
							if (searchQuery) {
								dispatch(searchRepositories({
									query: searchQuery,
									filters: clearedFilters
								}));
							}
						}}
						aria-label="Clear all filters"
					>
						Clear All Filters
					</button>
				</div>
			)}
		</div>
	);
};

export default FilterPanel;

