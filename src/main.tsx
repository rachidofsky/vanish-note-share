
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize theme from localStorage or system preference
const initializeTheme = () => {
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
  
  if (storedTheme === 'light') {
    document.documentElement.classList.add('light');
  } else if (storedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    // Default to system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.add(systemPrefersDark ? 'dark' : 'light');
  }
};

// Initialize theme before rendering
initializeTheme();

// Make sure we're rendering with React 18 createRoot API
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
