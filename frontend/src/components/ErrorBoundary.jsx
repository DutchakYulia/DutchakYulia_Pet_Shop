import React from "react";
import { trackEvent } from "../utils/analytics";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    trackEvent("ui_error", {
      message: error.message,
      component_stack: info.componentStack
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-white p-6 text-ink">
          <h1 className="text-2xl font-bold">Помилка інтерфейсу</h1>
          <pre className="mt-4 overflow-auto rounded-lg bg-slate-100 p-4 text-sm">
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
