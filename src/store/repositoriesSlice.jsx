/**
 * 
 * /src/store/repositoriesSlice.jsx
 * redux state management
 * This file manages all repository-related state in the application
 * 
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as githubAPI from '../services/githubAPI';


export const searchRepositories = createAsyncThunk(
	'repositories/search',
	async ({ query, filters }, { rejectWithValue }) => {

		try {
			const response = await githubAPI.searchRepositories(query, filters);

			return response;

		} catch (error) {
			return rejectWithValue({
				message: error.message,
				query: query,
				filters: filters
			});
		}
	}
);

export const fetchRepositoryDetails = createAsyncThunk(
	'repositories/fetchDetails',
	async ({ owner, repo }, { rejectWithValue }) => {

		try {

			const details = await githubAPI.getRepositoryDetails(owner, repo);

			const readme = await githubAPI.getRepositoryReadme(owner, repo);

			// Combine repository details with README content
			const combinedData = { ...details, readme };

			return combinedData;

		} catch (error) {
			// Return a serializable error for Redux
			return rejectWithValue({
				message: error.message,
				owner: owner,
				repo: repo
			});
		}
	}
);

const repositoriesSlice = createSlice({
	name: 'repositories',
	initialState: {
		items: [],
		selectedRepository: null,
		loading: false,
		error: null,
		searchQuery: '',
		filters: {
			language: '',
			sort: 'stars',
			order: 'desc',
			starRange: ''
		}
	},

	reducers: {
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
		},

		setFilters: (state, action) => {
			state.filters = { ...state.filters, ...action.payload };
		},

		clearSelectedRepository: (state) => {
			state.selectedRepository = null;
		}
	},

	extraReducers: (builder) => {
		builder
			// Search Repositories - Pending
			.addCase(searchRepositories.pending, (state) => {
				state.loading = true;
				state.error = null;  // Clear any previous errors
			})

			// Search Repositories - Fulfilled
			.addCase(searchRepositories.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.items;  // Update search results
				state.error = null;
			})

			// Search Repositories - Rejected
			.addCase(searchRepositories.rejected, (state, action) => {
				state.loading = false;
				state.items = [];  // Clear results on error
				state.error = action.payload?.message || action.error.message;
			})

			// Fetch Repository Details - Pending
			.addCase(fetchRepositoryDetails.pending, (state) => {
				state.loading = true;
				state.error = null;
			})

			// Fetch Repository Details - Fulfilled
			.addCase(fetchRepositoryDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedRepository = action.payload;  // Store selected repository
				state.error = null;
			})

			// Fetch Repository Details - Rejected
			.addCase(fetchRepositoryDetails.rejected, (state, action) => {
				state.loading = false;
				state.selectedRepository = null;  // Clear selected repository on error
				state.error = action.payload?.message || action.error.message;
			});
	}
});

export const {
	setSearchQuery,
	setFilters,
	clearSelectedRepository
} = repositoriesSlice.actions;

export default repositoriesSlice.reducer;
