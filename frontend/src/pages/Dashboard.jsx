import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { urlAPI } from '../services/api';
import {
  Link2,
  LogOut,
  User,
  Plus,
  Link as LinkIcon,
  MousePointerClick,
  ListChecks,
  Copy,
  BarChart3,
  Trash2,
  AlertCircle,
  CheckCircle,
  Inbox,
} from 'lucide-react';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [originalURL, setOriginalURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, logout } = useAuth();
  const BACKEND_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchURLs();
  }, []);

  const fetchURLs = async () => {
    try {
      const response = await urlAPI.getMyURLs();
      setUrls(response.data.data);
    } catch (err) {
      setError('Failed to load URLs');
    }
  };

  const handleCreateURL = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await urlAPI.create(originalURL);
      setSuccess('Short URL created successfully!');
      setOriginalURL('');
      fetchURLs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shortCode) => {
    if (window.confirm('Delete this URL?')) {
      try {
        await urlAPI.delete(shortCode);
        setSuccess('URL deleted successfully');
        fetchURLs();
      } catch (err) {
        setError('Failed to delete URL');
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const totalClicks = urls.reduce((sum, u) => sum + (u.totalClicks || 0), 0);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <Link2 size={22} color="#1e293b" />
          <h1>LinkShort</h1>
        </div>
        <div className="header-right">
          <span className="user-email">
            <User size={15} />
            {user?.email}
          </span>
          <button onClick={logout} className="logout-btn">
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {/* Stats Overview */}
        <section className="stats-overview">
          <div className="overview-card">
            <div className="overview-icon blue">
              <ListChecks size={20} />
            </div>
            <div className="overview-text">
              <div className="overview-value">{urls.length}</div>
              <div className="overview-label">Total Links</div>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon green">
              <MousePointerClick size={20} />
            </div>
            <div className="overview-text">
              <div className="overview-value">{totalClicks}</div>
              <div className="overview-label">Total Clicks</div>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon purple">
              <LinkIcon size={20} />
            </div>
            <div className="overview-text">
              <div className="overview-value">
                {urls.length > 0
                  ? (totalClicks / urls.length).toFixed(1)
                  : '0'}
              </div>
              <div className="overview-label">Avg. Clicks per Link</div>
            </div>
          </div>
        </section>

        {/* Create URL */}
        <section className="create-section">
          <h2>Create a new short link</h2>
          <p className="subtitle">Paste a long URL below to generate a shareable short link</p>

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          {success && (
            <div className="success-message">
              <CheckCircle size={16} />
              {success}
            </div>
          )}

          <form onSubmit={handleCreateURL}>
            <div className="input-wrapper">
              <LinkIcon size={16} />
              <input
                type="text"
                placeholder="https://example.com/your-long-url"
                value={originalURL}
                onChange={(e) => setOriginalURL(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              <Plus size={16} />
              {loading ? 'Creating...' : 'Shorten URL'}
            </button>
          </form>
        </section>

        {/* URLs List */}
        <section className="urls-section">
          <h2>Your Links ({urls.length})</h2>

          {urls.length === 0 ? (
            <div className="no-urls">
              <Inbox size={36} strokeWidth={1.5} />
              <p>No short URLs yet. Create one above to get started!</p>
            </div>
          ) : (
            <div className="urls-grid">
              {urls.map((url) => (
                <div key={url._id} className="url-card">
                  <div>
                    <div className="url-card-top">
                      <span className="short-code-badge">
                        <Link2 size={14} />
                        {url.shortCode}
                      </span>
                      <span className="click-badge">
                        <MousePointerClick size={12} />
                        {url.totalClicks} clicks
                      </span>
                    </div>

                    <p className="original-url" title={url.originalURL}>
                      {url.originalURL.length > 60
                        ? url.originalURL.substring(0, 60) + '...'
                        : url.originalURL}
                    </p>

                    <p className="meta-info">
                      Created {new Date(url.createdAt).toLocaleDateString()}
                    </p>
                  </div>

               <div className="url-actions">
  <button
    onClick={() => copyToClipboard(`${BACKEND_URL}/${url.shortCode}`)}
  >
    <Copy size={13} />
    Copy
  </button>

  <a
    href={`${BACKEND_URL}/${url.shortCode}`}
    target="_blank"
    rel="noopener noreferrer"
    className="visit-btn"
  >
    Visit
  </a>

  <Link 
  to={`/analytics/${url.shortCode}`} 
  className="analytics-btn"
>
  <BarChart3 size={13} />
  Analytics
</Link>

  <button
    className="delete-btn"
    onClick={() => handleDelete(url.shortCode)}
  >
    <Trash2 size={13} />
    Delete
  </button>
</div>
            
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}