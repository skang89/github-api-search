/**
 * 
 * src/pages/RepositoryDetailsPage.jsx
 * Repository Details Page UI 
 * 
 */

import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRepositoryDetails } from '../store/repositoriesSlice';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import RepositoryDetails from '../components/RepositoryDetails/RepositoryDetails'

const RepositoryDetailsPage = () => {
	const { owner, repo } = useParams();
	const dispatch = useDispatch();
	const { selectedRepository, loading } = useSelector(state => state.repositories);

	useEffect(() => {
		// Fetch repository details when component mounts or params change
		if (owner && repo) {
			dispatch(fetchRepositoryDetails({ owner, repo }));
		}
	}, [owner, repo, dispatch]);

	return (
		<div className="repository-details-page">
			<div className="back-navigation">
				<Link to="/" className="back-button">
					Back to Search Results
				</Link>
			</div>

			{/* Loading State */}
			{loading && <LoadingSpinner />}

			{!loading && <RepositoryDetails repository={selectedRepository} />}
		</div>
	);
};

export default RepositoryDetailsPage;
