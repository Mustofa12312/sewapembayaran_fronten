import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0f172a',
            color: '#f8fafc',
            fontFamily: 'Inter, sans-serif',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Oops! Something went wrong.
          </h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem', maxWidth: '480px' }}>
            An unexpected error occurred. Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
          {import.meta.env.DEV && this.state.error && (
            <pre
              style={{
                marginTop: '2rem',
                background: '#1e293b',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                color: '#f87171',
                textAlign: 'left',
                maxWidth: '720px',
                overflow: 'auto',
              }}
            >
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
