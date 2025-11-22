import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, Button } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Алдаа гарлаа</Text>
          <Button
            title="Дахин оролдох"
            onPress={() => this.setState({ hasError: false, error: null })}
          />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
