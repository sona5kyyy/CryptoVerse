import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(res => setCoin(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!coin) return <p className="p-4 text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">{coin.name} Details</h2>
      <div className="bg-gray-800 p-4 rounded-xl max-w-xl mx-auto">
        <img src={coin.image.large} alt={coin.name} className="w-16 h-16 mx-auto mb-4" />
        <p>Symbol: {coin.symbol.toUpperCase()}</p>
        <p>Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</p>
        <p>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
        <p>All-Time High: ${coin.market_data.ath.usd.toLocaleString()}</p>
        <p>Total Supply: {coin.market_data.total_supply?.toLocaleString() || "N/A"}</p>
      </div>
    </div>
  );
};

export default CoinDetail;
