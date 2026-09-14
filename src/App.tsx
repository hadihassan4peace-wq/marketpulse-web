import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import MarketsPage from './pages/MarketsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';
import SubmitReportPage from './pages/SubmitReportPage';
import StatsPage from './pages/StatsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';


function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div>
      <nav>
        <span className="brand">MarketPulse</span>
        <Link to="/">Markets</Link>
        <Link to="/stats">Price Trends</Link>
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <Link to="/submit">Submit Price</Link>
            {user.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<MarketsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
          <Route path="/submit" element={<ProtectedRoute><SubmitReportPage /></ProtectedRoute>} />
<Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;