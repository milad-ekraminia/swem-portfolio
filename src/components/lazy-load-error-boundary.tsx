import ErrorPageImage from '@/components/pages/error/image';
import { Button } from '@/components/ui/button/button';
import { getCookie } from '@/helpers/cookies';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ArrowLeft, ArrowRight, Headset, Mail, RefreshCw, Trash2 } from 'lucide-react';
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary specifically for lazy loading errors
 * Catches chunk loading failures and provides a user-friendly UI with retry option
 */
export class LazyLoadErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('LazyLoadErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    // Clear session storage and reload
    sessionStorage.clear();
    window.location.reload();
  };

  handleClearCacheAndReload = () => {
    // Clear all storage and reload
    sessionStorage.clear();
    localStorage.clear();

    // Try to clear cache if available
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }

    window.location.reload();
  };

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      const isChunkError =
        this.state.error?.message?.includes('Failed to fetch') ||
        this.state.error?.message?.includes('dynamically imported module') ||
        this.state.error?.message?.includes('Importing a module script failed');

      const isRTL = getCookie('CultureName') === 'fa';

      return (
        <div className="dv-error">
          {/* Content Section */}
          <div className="dv-error__content-section">
            <div className="dv-error__content-section__content">
              <div className="dv-error__content-section__content__inner">
                <div className="dv-error__content-section__content__inner-background"></div>
                <div className="text-box">
                  <h1 style={{ fontSize: 'var(--font-size-display-md)' }}>
                    {isChunkError
                      ? getTranslatedValue('RenderBoundaryErrorMessage')
                      : getTranslatedValue('UnexpectedBoundaryErrorOccurred')}
                  </h1>
                  {isChunkError && <h3 className="desc">
                    {getTranslatedValue('BoundaryErrorMessage')}
                  </h3>
                  }

                  {/* Error Details (Collapsible) */}
                  {this.state.error && (
                    <details style={{ marginTop: '1rem' }}>
                      <summary
                        style={{
                          cursor: 'pointer',
                          color: '#666',
                          fontSize: 'var(--font-size-text-md)',
                        }}
                      >
                        {getTranslatedValue('BoundaryErrorDetails')}
                      </summary>
                      <pre
                        style={{
                          backgroundColor: '#f5f5f5',
                          padding: '1rem',
                          borderRadius: '4px',
                          overflow: 'auto',
                          fontSize: 'var(--font-size-text-sm)',
                          color: '#d32f2f',
                          marginTop: '0.5rem',
                          direction: 'ltr',
                          textAlign: 'left',
                        }}
                      >
                        {this.state.error.message}
                      </pre>
                    </details>
                  )}

                  {/* Contact Information */}
                  {(import.meta.env.VITE_SUPPORT_PHONE ||
                    import.meta.env.VITE_SUPPORT_EMAIL) && (
                      <div
                        style={{
                          marginTop: '1.5rem',
                          padding: '1rem',
                          backgroundColor: 'var(--bg-secondary)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--border-secondary)',
                        }}
                      >
                        <p
                          style={{
                            fontSize: 'var(--font-size-text-sm)',
                            color: 'var(--text-secondary)',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                          }}
                        >
                          {getTranslatedValue('BoundaryErrorContactSupport')}
                        </p>
                        <div
                          style={{
                            fontSize: 'var(--font-size-text-sm)',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                          }}
                        >
                          {import.meta.env.VITE_SUPPORT_PHONE && (
                            <a
                              href={`tel:${import.meta.env.VITE_SUPPORT_PHONE}`}
                              className='dv-error-support-item'
                            >
                              <Headset size={14} /> <span>{import.meta.env.VITE_SUPPORT_PHONE}</span>
                            </a>
                          )}
                          {import.meta.env.VITE_SUPPORT_EMAIL && (
                            <a
                              href={`mailto:${import.meta.env.VITE_SUPPORT_EMAIL}`}
                              className='dv-error-support-item'
                            >
                              <Mail size={14} /> <span>{import.meta.env.VITE_SUPPORT_EMAIL}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="dv-submit-or-cancel-buttons custom-error-buttons">
                  <Button onClick={this.handleGoBack} type="button" variant="secondary">
                    <div className="custom-error-buttons__content-box">
                      {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                      {getTranslatedValue('GoBack')}
                    </div>
                  </Button>

                  <Button onClick={this.handleReload} type="button" variant="primary">
                    <div className="custom-error-buttons__content-box">
                      <RefreshCw size={20} />
                      {getTranslatedValue('BoundaryErrorRetry')}
                    </div>
                  </Button>

                  {isChunkError && (
                    <Button
                      onClick={this.handleClearCacheAndReload}
                      type="button"
                      variant="danger"
                    >
                      <div className="custom-error-buttons__content-box">
                        <Trash2 size={20} />
                        {getTranslatedValue('BoundaryErrorClearCacheAndReload')}
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <ErrorPageImage />
        </div>
      );
    }

    return this.props.children;
  }
}

