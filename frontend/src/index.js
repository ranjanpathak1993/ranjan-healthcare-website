import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
  <div>
    <h1>Welcome to Ranjan Healthcare</h1>
    <p>Book your appointment online.</p>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
