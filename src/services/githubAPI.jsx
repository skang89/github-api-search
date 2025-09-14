/**
 * 
 * src/services/githubAPI.jsx
 * 
 */

const GITHUB_API_BASE = 'https://api.github.com';


export const searchRepositories = async (query, filters = {}) => {

	// Extract filters with default values
	const { language, sort = 'stars', order = 'desc', starRange } = filters;

	// Start with the base search query
	let searchQuery = query;

	// Add language filter to search query if specified
	if (language) {
		searchQuery += ` language:${language}`;
	}

	// Add star range filter to search query if specified
	if (starRange) {
		searchQuery += ` ${starRange}`;
	}

	// Build URL parameters for the API request
	const params = new URLSearchParams({
		q: searchQuery,
		sort,
		order,
		per_page: 50
	});

	const apiUrl = `${GITHUB_API_BASE}/search/repositories?${params}`;

	try {
		// Make the HTTP request to GitHub API
		const response = await fetch(apiUrl);

		// Check if the response is unsuccessful
		if (!response.ok) {
			if (response.status === 403) {
				throw new Error('GitHub API rate limit exceeded. Please try again later.');
			} else if (response.status === 422) {
				throw new Error('Invalid search query. Please check your search terms.');
			} else {
				throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
			}
		}

		// Parse the JSON response
		const data = await response.json();
		return data;

	} catch (error) {
		throw error;
	}
};

export const getRepositoryDetails = async (owner, repo) => {

	const apiUrl = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;

	try {
		const response = await fetch(apiUrl);

		// Check if the response is unsuccessful
		if (!response.ok) {
			if (response.status === 404) {
				throw new Error(`Repository ${owner}/${repo} not found`);
			} else if (response.status === 403) {
				throw new Error('Access to repository is forbidden');
			} else {
				throw new Error(`Failed to fetch repository details: ${response.status}`);
			}
		}

		const data = await response.json();
		return data;

	} catch (error) {
		throw error;
	}
};

export const getRepositoryReadme = async (owner, repo) => {

	const apiUrl = `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`;

	try {
		const response = await fetch(apiUrl, {
			headers: {
				'Accept': 'application/vnd.github.v3+json'  // GitHub API v3 format
			}
		});

		// README might not exist - this is not an error condition
		if (!response.ok) {
			if (response.status === 404) {
				return null;
			} else {
				return null;
			}
		}

		const data = await response.json();

		// decode README content is base64 encoded
		if (data.content) {
			const decodedContent = atob(data.content);

			return decodedContent;
		} else {
			return null;
		}

	} catch (error) {
		// return null instead of throwing as README is optional
		return null;
	}
};
