import { useState, FormEvent } from 'react';
import apiClient from '../api/client';

export default function AdminPage() {
  const [marketName, setMarketName] = useState('');
  const [marketCity, setMarketCity] = useState('');
  const [marketState, setMarketState] = useState('');
  const [marketError, setMarketError] = useState('');
  const [marketSuccess, setMarketSuccess] = useState('');

  const [commodityName, setCommodityName] = useState('');
  const [commodityUnit, setCommodityUnit] = useState('');
  const [commodityError, setCommodityError] = useState('');
  const [commoditySuccess, setCommoditySuccess] = useState('');

  async function handleCreateMarket(e: FormEvent) {
    e.preventDefault();
    setMarketError('');
    setMarketSuccess('');

    try {
      await apiClient.post('/markets', { name: marketName, city: marketCity, state: marketState });
      setMarketSuccess(`Market "${marketName}" created!`);
      setMarketName('');
      setMarketCity('');
      setMarketState('');
    } catch (err: any) {
      setMarketError(err.response?.data?.message || 'Failed to create market');
    }
  }

  async function handleCreateCommodity(e: FormEvent) {
    e.preventDefault();
    setCommodityError('');
    setCommoditySuccess('');

    try {
      await apiClient.post('/commodities', { name: commodityName, unit: commodityUnit });
      setCommoditySuccess(`Commodity "${commodityName}" created!`);
      setCommodityName('');
      setCommodityUnit('');
    } catch (err: any) {
      setCommodityError(err.response?.data?.message || 'Failed to create commodity');
    }
  }

  return (
    <div>
      <h2>Admin Panel</h2>

      <div className="card">
        <h3>Add a Market</h3>
        {marketError && <p className="error">{marketError}</p>}
        {marketSuccess && <p>{marketSuccess}</p>}
        <form onSubmit={handleCreateMarket}>
          <div className="form-group">
            <label>Name</label>
            <input value={marketName} onChange={(e) => setMarketName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>City</label>
            <input value={marketCity} onChange={(e) => setMarketCity(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>State</label>
            <input value={marketState} onChange={(e) => setMarketState(e.target.value)} required />
          </div>
          <button type="submit">Add Market</button>
        </form>
      </div>

      <div className="card">
        <h3>Add a Commodity</h3>
        {commodityError && <p className="error">{commodityError}</p>}
        {commoditySuccess && <p>{commoditySuccess}</p>}
        <form onSubmit={handleCreateCommodity}>
          <div className="form-group">
            <label>Name</label>
            <input value={commodityName} onChange={(e) => setCommodityName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Unit</label>
            <input value={commodityUnit} onChange={(e) => setCommodityUnit(e.target.value)} placeholder="e.g. kg, derica, litre" required />
          </div>
          <button type="submit">Add Commodity</button>
        </form>
      </div>
    </div>
  );
}