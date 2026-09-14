import { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import type { Market } from '../types/market';
import type { Commodity } from '../types/commodity';

export default function SubmitReportPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [marketId, setMarketId] = useState('');
  const [commodityId, setCommodityId] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOptions() {
      const [marketsRes, commoditiesRes] = await Promise.all([
        apiClient.get('/markets'),
        apiClient.get('/commodities'),
      ]);
      setMarkets(marketsRes.data.data);
      setCommodities(commoditiesRes.data.data);
    }
    fetchOptions();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await apiClient.post('/price-reports', {
        marketId,
        commodityId,
        price: Number(price),
      });
      setSuccess('Price report submitted successfully!');
      setPrice('');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to submit report';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Submit a Price Report</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="card">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Market</label>
          <select value={marketId} onChange={(e) => setMarketId(e.target.value)} required>
            <option value="">Select a market</option>
            {markets.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Commodity</label>
          <select value={commodityId} onChange={(e) => setCommodityId(e.target.value)} required>
            <option value="">Select a commodity</option>
            {commodities.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.unit})</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Price (₦)</label>
          <input type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}