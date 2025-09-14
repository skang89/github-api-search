/**
 * 
 * src/components/RepositoryDetails/RepositoryDetails.jsx
 * Repository Details component
 * 
 */

const RepositoryDetails = ({ repository }) => {
	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const formatNumber = (num) => {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'M';
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	};

	if (!repository) {
		return (
			<div className="error-message">
				<h2>Repository not found</h2>
				<p>The requested repository could not be loaded.</p>
			</div>
		);
	}

	return (
		<>
			<div className="repo-details-header">
				<div className="repo-details-title-section">
					<h1 className="repo-details-title">{repository.full_name}</h1>
				</div>

				<div className="repo-details-actions">
					<a
						href={repository.html_url}
						target="_blank"
						rel="noopener noreferrer"
						className="primary-button"
					>
						View on GitHub
					</a>
				</div>
			</div>

			{repository.description && (
				<div className="repo-details-description-section">
					<h3>About Repo:</h3>
					<p className="repo-details-description">{repository.description}</p>
				</div>
			)}

			{/* Repository Stats */}
			<div className="repo-details-stats-container">
				<div className="stat-card">
					<div className="stat-content">
						<div className="stat-number">{formatNumber(repository.stargazers_count)}</div>
						<div className="stat-label">Stars</div>
					</div>
				</div>

				<div className="stat-card">
					<div className="stat-content">
						<div className="stat-number">{formatNumber(repository.forks_count)}</div>
						<div className="stat-label">Forks</div>
					</div>
				</div>

				<div className="stat-card">
					<div className="stat-content">
						<div className="stat-number">{formatNumber(repository.watchers_count)}</div>
						<div className="stat-label">Watchers</div>
					</div>
				</div>

				<div className="stat-card">
					<div className="stat-content">
						<div className="stat-number">{formatNumber(repository.open_issues_count)}</div>
						<div className="stat-label">Open Issues</div>
					</div>
				</div>
			</div>

			<div className="repo-details-container">
				<div className="detail-section">
					<h3>Repository Information</h3>
					<div className="detail-list">
						{repository.language && (
							<div className="detail-item">
								<span className="detail-label">Primary Language:</span>
								<span className="detail-value language-badge">{repository.language}</span>
							</div>
						)}

						<div className="detail-item">
							<span className="detail-label">Created:</span>
							<span className="detail-value">{formatDate(repository.created_at)}</span>
						</div>

						<div className="detail-item">
							<span className="detail-label">Last Updated:</span>
							<span className="detail-value">{formatDate(repository.updated_at)}</span>
						</div>

						<div className="detail-item">
							<span className="detail-label">Default Branch:</span>
							<span className="detail-value">{repository.default_branch}</span>
						</div>

						<div className="detail-item">
							<span className="detail-label">Repository Size:</span>
							<span className="detail-value">{formatNumber(repository.size)} KB</span>
						</div>

						{repository.license && (
							<div className="detail-item">
								<span className="detail-label">License:</span>
								<span className="detail-value">{repository.license.name}</span>
							</div>
						)}
					</div>
				</div>

				<div className="detail-section">
					<h3>👤 Owner Information</h3>
					<div className="owner-info">
						<img
							src={repository.owner.avatar_url}
							alt={repository.owner.login}
							className="owner-avatar"
						/>
						<div className="owner-details">
							<div className="owner-name">{repository.owner.login}</div>
							<div className="owner-type">{repository.owner.type}</div>
							<a
								href={repository.owner.html_url}
								target="_blank"
								rel="noopener noreferrer"
								className="owner-link"
							>
								View Profile →
							</a>
						</div>
					</div>
				</div>
			</div>

			{repository.readme && (
				<div className="readme-section">
					<h3>README</h3>
					<div className="readme-container">
						<pre className="readme-content">{repository.readme}</pre>
					</div>
				</div>
			)}

		</>
	);
};

export default RepositoryDetails;
