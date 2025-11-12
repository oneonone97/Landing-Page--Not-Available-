import React from 'react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import './ErrorBoundary.css';

// Initialize Sentry for error tracking
if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
    environment: 'production',
    // Capture 100% of errors in production
    sampleRate: 1.0,
  });
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Update state for UI
    this.setState({
      error,
      errorInfo
    });

    // Send to error tracking service in production
    if (import.meta.env.PROD) {
      // Send error to Sentry with additional context
      Sentry.withScope((scope) => {
        scope.setTag('component', 'ErrorBoundary');
        scope.setTag('error_type', 'react_error_boundary');
        scope.setContext('error_info', {
          componentStack: errorInfo.componentStack,
          errorBoundary: 'main',
          timestamp: new Date().toISOString()
        });
        Sentry.captureException(error);
      });

      // Fallback: Log to console if Sentry fails
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    } else {
      // Development: Log to console only
      console.error('ErrorBoundary (DEV):', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
  return (
    <div className="error-boundary">
      <div className="error-boundary-content">
        <div className="error-boundary-icon">⚠️</div>
        <h1 className="error-boundary-title">Oops! Something went wrong</h1>
        <p className="error-boundary-message">
          We're sorry for the inconvenience. An unexpected error occurred.
        </p>
        {import.meta.env.PROD && (
          <p className="error-boundary-message" style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
            This error has been reported and will be fixed soon.
          </p>
        )}

            {import.meta.env.DEV && this.state.error && (
              <details className="error-boundary-details">
                <summary>Error Details (Development Only)</summary>
                <pre className="error-boundary-stack">
                  <strong>Error:</strong> {this.state.error.toString()}
                  {'\n\n'}
                  <strong>Stack Trace:</strong>
                  {'\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="error-boundary-actions">
              <button
                onClick={this.handleReset}
                className="error-boundary-btn error-boundary-btn-primary"
              >
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="error-boundary-btn error-boundary-btn-secondary"
              >
                Reload Page
              </button>
              <a
                href="/"
                className="error-boundary-btn error-boundary-btn-secondary"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;