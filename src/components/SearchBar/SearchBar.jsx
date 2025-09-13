/**
 * 
 * src/components/SearchBar/SearchBar.jsx
 * SearchBar Component
 * 
 */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRepositories, setSearchQuery } from '../../store/repositoriesSlice';

const SearchBar = () => {

  // Redux hooks for state management
  const dispatch = useDispatch();
  
  // Get current search query from Redux store
  const { searchQuery } = useSelector(state => {
    return state.repositories;
  });

  // Local state for the input field
  // This allows responsive typing without triggering Redux updates on every keystroke
  const [inputValue, setInputValue] = useState(searchQuery);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that we have a search term
    if (inputValue.trim()) {
      const searchTerm = inputValue.trim();

      console.log('search query:', searchTerm);
      
      // Update the search query in Redux store
      dispatch(setSearchQuery(searchTerm));
      
      dispatch(searchRepositories({ 
        query: searchTerm
      }));
      
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    setInputValue(newValue);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search repositories..."
        className="search-input"
        aria-label="Search repositories"
      />

      <button 
        type="submit" 
        className="search-button" 
        aria-label="Search"
        disabled={!inputValue.trim()}
        title="Search GitHub repositories"
        variant="contained"
      >
        Search
      </button>
      
    </form>
  );
};

export default SearchBar;
