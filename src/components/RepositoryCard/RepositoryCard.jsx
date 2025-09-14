/**
 * src/components/RepositoryCard/RepositoryCard.jsx
 * 
 * search results of repos
 * 
 */

import { Link } from 'react-router-dom';


const RepositoryCard = ({ repository }) => {

  const createShortSummary = (text, maxLength = 100) => {
    // Return text as normal if it's short enough or doesn't exist
    if (!text || text.length <= maxLength) {
      return text;
    }

    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    const result = lastSpace > 0
      ? truncated.substring(0, lastSpace) + '...'
      : truncated + '...';

    return result;
  };

  // Format Large Numbers for Display
  const formatNumber = (num) => {
    let formatted;

    if (num >= 1000000) {
      formatted = (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      formatted = (num / 1000).toFixed(1) + 'K';
    } else {
      formatted = num.toLocaleString();
    }

    return formatted;
  };

  // format date
  const updatedDate = new Date(repository.updated_at);

  return (
    <div className="repo-card">

      <div className="repo-card-header">
        <h3 className="repo-card-name">
          <Link
            to={`/repository/${repository.owner.login}/${repository.name}`}
            className="repo-card-details-button"
            aria-label={`View details for ${repository.name}`}
          >
            {repository.name}
          </Link>
        </h3>

        <p className="repo-card-owner">
          by: <a
            href={repository.owner.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${repository.owner.login}'s profile`}
          >
            {repository.owner.login}
          </a>
        </p>
      </div>

      {repository.description && (
        <div>
          <p className="repo-card-description">
            {createShortSummary(repository.description)}
          </p>
        </div>
      )}

      <div className="repo-card-stats">
        {repository.language && (
          <div>
            <span className="language" aria-label={`Written in ${repository.language}`}>
              <strong>Language:</strong> {repository.language}
            </span>
          </div>
        )}

        <span className="stat" aria-label={`${repository.stargazers_count} stars`}>
          <strong>Stars:</strong> {formatNumber(repository.stargazers_count)}
        </span>

        <span className="stat" aria-label={`${repository.forks_count} forks`}>
          <strong>Forks:</strong> {formatNumber(repository.forks_count)}
        </span>

        <span className="stat" aria-label={`${repository.open_issues_count} open issues`}>
          <strong>Open Issues:</strong> {formatNumber(repository.open_issues_count)}
        </span>

        <span className="stat" aria-label={`${repository.watchers_count} watchers/likes`}>
          <strong>Watchers:</strong> {formatNumber(repository.watchers_count)}
        </span>

        <span className="stat updated-date" aria-label={`Updated on ${updatedDate.toDateString()}`}>
          <strong>Last Updated:</strong> {updatedDate.toDateString()}
        </span>
      </div>

      <div className="repo-card-actions">
        <Link
          to={`/repository/${repository.owner.login}/${repository.name}`}
          className="details-button"
          aria-label={`View details for ${repository.name}`}
        >
          View Details →
        </Link>
        <br />

        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          aria-label={`Open ${repository.name} on GitHub`}
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
};

export default RepositoryCard;
