import App from '@layouts/App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
