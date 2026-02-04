import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      // Replace with your actual search API
      fetch(`http://localhost:4000/search?q=${query}`)
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(err => console.error('Search error:', err));
    }
  }, [query]);

  return (
    <div className="search-results animate-in">
      <h2>Search Results for: {query}</h2>
      <div className="results-grid">
        {results.map((item, index) => (
          <div key={item.id} className="result-card" style={{animationDelay: `${index * 0.1}s`}}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
