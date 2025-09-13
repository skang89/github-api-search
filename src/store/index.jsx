/**
 * 
 * /src/store/index.jsx
 * redux store config
 * This file creates and configures the main Redux store 
 * 
 */

import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from './repositoriesSlice';


export const store = configureStore({
	reducer: {
		repositories: repositoriesReducer,
	},
});