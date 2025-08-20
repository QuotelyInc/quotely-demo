'use client'

import { useState } from 'react'
import Link from 'next/link'
import '../globals-clean.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Login logic would go here
    console.log('Login attempt:', { email, password })
  }

  return (
    <>
      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #F9FAFB 0%, #EFF6FF 100%);
          padding: 2rem;
        }

        .login-box {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          padding: 3rem;
          width: 100%;
          max-width: 400px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.75rem;
          font-weight: 700;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          margin-bottom: 0.5rem;
        }

        .logo-link::before {
          content: '⚡';
          font-size: 1.5rem;
          filter: none;
          -webkit-text-fill-color: initial;
        }

        .login-title {
          font-size: 1.5rem;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .login-subtitle {
          color: #6B7280;
          font-size: 0.95rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1.5px solid #E5E7EB;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #0057FF;
          box-shadow: 0 0 0 3px rgba(0, 87, 255, 0.1);
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6B7280;
          font-size: 0.875rem;
        }

        .forgot-link {
          color: #0057FF;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }

        .forgot-link:hover {
          color: #0045CC;
        }

        .login-button {
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 87, 255, 0.3);
        }

        .divider {
          text-align: center;
          margin: 2rem 0;
          position: relative;
          color: #9CA3AF;
          font-size: 0.875rem;
        }

        .divider::before,
        .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: calc(50% - 2rem);
          height: 1px;
          background: #E5E7EB;
        }

        .divider::before {
          left: 0;
        }

        .divider::after {
          right: 0;
        }

        .signup-prompt {
          text-align: center;
          color: #6B7280;
          font-size: 0.95rem;
        }

        .signup-link {
          color: #0057FF;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .signup-link:hover {
          color: #0045CC;
        }
      `}</style>

      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <Link href="/" className="logo-link">
              Quotely
            </Link>
            <h1 className="login-title">Welcome back</h1>
            <p className="login-subtitle">Sign in to your agent account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="agent@agency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Sign in to Dashboard
            </button>
          </form>

          <div className="divider">or</div>

          <div className="signup-prompt">
            Don't have an account?{' '}
            <Link href="/get-started" className="signup-link">
              Start free trial
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}