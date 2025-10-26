// src/main.jsx
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Dynamically import App component for code splitting
const App = lazy(() => import('./App.jsx'));

// Initialize dark mode
document.documentElement.classList.add('dark');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>
);
