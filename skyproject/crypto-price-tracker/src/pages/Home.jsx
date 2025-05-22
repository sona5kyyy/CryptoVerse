import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    })
    .then(res => {
      setCoins(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error:", err);
      setError("Error fetching data.");
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Top 10 Cryptocurrencies</h2>
      {loading ? <p className="text-center">Loading...</p> : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coins.map(coin => (
            <Link to={`/coin/${coin.id}`} key={coin.id} className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-2">
                <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                <div>
                  <h3 className="text-xl">{coin.name}</h3>
                  <p className="text-gray-400 uppercase text-sm">{coin.symbol}</p>
                </div>
              </div>
              <p>💰 ${coin.current_price.toLocaleString()}</p>
              <p className={`mt-1 ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                📈 24h: {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
