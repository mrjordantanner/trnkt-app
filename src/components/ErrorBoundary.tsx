import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {

    const divStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'ivory',
        };

      // Render fallback UI when there's an error
      return (
        <div style={divStyle}>
          <h1>404</h1>
          <h1>Oops! Something went wrong.</h1>
          <p>Please try refreshing the page or using the back button on your browser.</p>
        </div>
      );
    }

    // Render children normally if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
