import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import type { Market } from '../types/market';

export default function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMarkets() {
      try {
        const response = await apiClient.get('/markets');
        setMarkets(response.data.data);
      } catch (err) {
        setError('Failed to load markets');
      } finally {
        setLoading(false);
      }
    }

    fetchMarkets();
  }, []);

  if (loading) return <p>Loading markets...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Markets</h2>
      {markets.map((market) => (
        <div key={market.id} className="card">
          <strong>{market.name}</strong>
          <p>{market.city}, {market.state}</p>
        </div>
      ))}
    </div>
  );
}