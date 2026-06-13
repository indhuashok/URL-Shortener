import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { analyticsAPI } from '../services/api';
import '../styles/Analytics.css';

export default function Analytics() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, [shortCode]);

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsAPI.getAnalytics(shortCode);
      setAnalytics(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load analytics');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading analytics...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!analytics) return <div className="error-message">No data found</div>;

  return (
    <div className="analytics-container">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </button>

      <section className="analytics-header">
        <h1>Analytics for {analytics.shortCode}</h1>
        <p className="original-url">{analytics.originalURL}</p>
      </section>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Clicks</h3>
          <p className="stat-value">{analytics.totalClicks}</p>
        </div>
        <div className="stat-card">
          <h3>Created</h3>
          <p className="stat-value">{new Date(analytics.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="stat-card">
          <h3>Last Visited</h3>
          <p className="stat-value">
            {analytics.lastVisited ? new Date(analytics.lastVisited).toLocaleString() : 'Never'}
          </p>
        </div>
      </div>

      <section className="recent-clicks">
        <h2>Recent Click History</h2>
        {analytics.recentClicks.length === 0 ? (
          <p>No clicks yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>User Agent</th>
              </tr>
            </thead>
            <tbody>
              {analytics.recentClicks.map(click => (
                <tr key={click._id}>
                  <td>{new Date(click.timestamp).toLocaleString()}</td>
                  <td>{click.userAgent || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}