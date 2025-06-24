import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss';

const App: React.FC = () => <h1>Hello, React!</h1>;

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
