import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../components/App';
import '../src/styles.scss'
import * as bootstrap from 'bootstrap'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>)