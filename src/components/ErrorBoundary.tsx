import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Heart, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#120D12] text-[#FAF6EE] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#240D18] border border-[#631D38]/50 rounded-2xl p-8 shadow-2xl space-y-6">
            <div className="mx-auto w-14 h-14 rounded-full bg-[#B8405E]/20 text-[#F4B6C2] flex items-center justify-center">
              <Heart className="w-7 h-7 fill-current" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-medium text-[#FAF6EE]">
                A Quiet Pause...
              </h2>
              <p className="font-sans text-sm text-[#D8C5CF] leading-relaxed">
                Something paused while opening the letter. Don't worry, your letter is safe.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-full bg-[#B8405E] hover:bg-[#C94A6B] text-white text-sm font-medium transition-all shadow-md cursor-pointer"
              >
                Reopen Letter
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1C0A13] hover:bg-[#2F1120] text-[#D8C5CF] hover:text-white border border-[#521C30]/50 text-sm font-medium transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
