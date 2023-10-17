import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import fetchPokemonNames from '../../api/fetchPokemonNames';
import fetchTypes from '../../api/fetchTypes';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('pokemon');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    let fetchData;

    switch (filter) {
      case 'pokemon':
        fetchData = async () => {
          const results = await fetchPokemonNames();
          const names = results.map((result) => result.name);
          const sortedNames = names.sort((a, b) => a.localeCompare(b));
          setData(sortedNames);
        };
        break;
      case 'types':
        fetchData = async () => {
          const results = await fetchTypes();
          const types = results.map((result) => result.name);
          const sortedTypes = types.sort((a, b) => a.localeCompare(b));
          setData(sortedTypes);
        };
        break;
      default:
        setData([]);
        break;
    }
    if (fetchData) {
      fetchData();
    }
  }, [filter]);

  const handleInputChange = (input: string) => {
    setQuery(input);
    if (input) {
      const filteredSuggestions = data.filter((name) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        className={styles.searchInput}
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.searchSelect}
      >
        <option value="pokemon">Pokemon</option>
        <option value="types">Types</option>
        {/* TODO; Add more filters as needed */}
        {/* <option value="abilities">Abilities</option>
        <option value="berries">Berries</option> */}
      </select>
      <button onClick={() => onSearch(query)} className={styles.searchButton}>
        Search
      </button>
      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={styles.suggestionItem}
              onClick={() => {
                setQuery(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
