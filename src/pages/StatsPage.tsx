import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import type { PriceStat } from '../types/priceStats';

export default function StatsPage() {
  const [stats, setStats] = useState<PriceStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await apiClient.get('/price-reports/stats');
        setStats(response.data.data);
      } catch (err) {
        setError('Failed to load price stats');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <p>Loading price stats...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Price Trends</h2>
      {stats.length === 0 && <p>No price data yet.</p>}
      {stats.map((stat, index) => (
        <div key={index} className="card">
          <strong>{stat.commodity}</strong> ({stat.unit})
          <p>Average: ₦{stat.averagePrice.toFixed(2)}</p>
          <p>Range: ₦{stat.minPrice} – ₦{stat.maxPrice}</p>
          <p>Based on {stat.reportCount} report{stat.reportCount !== 1 ? 's' : ''}</p>
        </div>
      ))}
    </div>
  );
}