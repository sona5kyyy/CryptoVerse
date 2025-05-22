import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
    setResults(res.data.coins);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">🔍 Search Cryptocurrencies</h2>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search coin..."
          className="px-4 py-2 text-black rounded-l-lg"
        />
        <button onClick={handleSearch} className="bg-green-500 px-4 py-2 rounded-r-lg">
          Search
        </button>
      </div>

      <ul className="max-w-md mx-auto space-y-2">
        {results.map(coin => (
          <li key={coin.id} className="bg-gray-800 p-3 rounded-lg">
            <img src={coin.thumb} alt={coin.name} className="inline w-6 h-6 mr-2" />
            <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
