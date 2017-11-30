import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// Using ReactDOM that we imported which has a method to render a
// React component ('App') into a particular element that exists in the DOM ('#app')
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
