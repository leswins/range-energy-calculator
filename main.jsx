import React from 'react';
import { createRoot } from 'react-dom/client';
import RangeSavingsCalculator from './range-savings-calculator.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RangeSavingsCalculator />
  </React.StrictMode>
);
