import React from 'react';
import App from './App.jsx';
import './styles.css';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App name='Memesters' />);
