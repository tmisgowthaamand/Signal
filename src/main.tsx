import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';

// Create a root element
const container = document.getElementById('root')!;
const app = (
  <HelmetProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </HelmetProvider>
);

// Use hydrate for server-side rendering or createRoot for client-side only
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  const root = createRoot(container);
  root.render(app);
}

// Enable Web Vitals reporting in development
if (process.env.NODE_ENV === 'development') {
  import('./reportWebVitals').then(({ default: reportWebVitals }) => {
    reportWebVitals(console.log);
  });
}
