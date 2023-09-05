import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
  // Your component logic and state can go here
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSeachQuery(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSeachQuery}>
      <input
        type="text"
        value={query}
        placeholder="Search Order #"
        onChange={(e) => setQuery(e.target.value)}
        className="w-24 rounded-full bg-yellow-100 px-4 py-2 text-sm text-stone-800 transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}
