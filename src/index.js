import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { StateProvider } from './StateProvider';

ReactDOM.render(
  <Router>
    <StateProvider>
      <App />
    </StateProvider>
  </Router>,
  document.getElementById('root')
);
