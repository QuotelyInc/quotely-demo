import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CompetitiveAnalysisPage from './pages/CompetitiveAnalysisPage';
import QuotesPage from './pages/QuotesPage';
import IntegrationsPage from './pages/IntegrationsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import NotificationProvider from './components/NotificationProvider';
import ErrorBoundary from './components/ErrorBoundary';
import './AppRouter.css';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Header component with logout
const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  const initials = userEmail.split('@')[0].substring(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-section">
          <h1 className="app-logo">
            <Link to="/">Quotely</Link>
          </h1>
          <span className="app-tagline">Insurance Intelligence Platform</span>
        </div>
        
        <nav className="main-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="icon-home"></i>
            Dashboard
          </NavLink>
          <NavLink to="/competitive-analysis" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="icon-analysis"></i>
            Competitive Analysis
          </NavLink>
          <NavLink to="/quotes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="icon-quotes"></i>
            Quotes
          </NavLink>
          <NavLink to="/integrations" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="icon-integrations"></i>
            Integrations
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="icon-settings"></i>
            Settings
          </NavLink>
        </nav>

        <div className="user-section">
          <div className="user-profile">
            <span className="user-avatar">{initials}</span>
            <span className="user-name">{userEmail.split('@')[0]}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

const AppRouter: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <Router>
          <div className="app-container">
        {/* Show header only if authenticated */}
        {isAuthenticated && window.location.pathname !== '/login' && <AppHeader />}

        {/* Main Content */}
        <main className="app-main">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/competitive-analysis" element={
              <ProtectedRoute>
                <CompetitiveAnalysisPage />
              </ProtectedRoute>
            } />
            <Route path="/quotes" element={
              <ProtectedRoute>
                <QuotesPage />
              </ProtectedRoute>
            } />
            <Route path="/integrations" element={
              <ProtectedRoute>
                <IntegrationsPage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        {/* Show footer only if authenticated */}
        {isAuthenticated && window.location.pathname !== '/login' && (
          <footer className="app-footer">
            <div className="footer-container">
              <p>&copy; 2025 Quotely Inc. | Modern Alternative to Applied Rater & EZLynx</p>
              <div className="footer-links">
                <a href="#help">Help</a>
                <a href="#docs">Documentation</a>
                <a href="#api">API</a>
                <a href="#status">System Status</a>
              </div>
            </div>
          </footer>
        )}
      </div>
    </Router>
    </NotificationProvider>
    </ErrorBoundary>
  );
};

export default AppRouter;