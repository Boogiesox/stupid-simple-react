import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import ExampleApi from './api';

const exampleApi = new ExampleApi;

const props = {
  onGetAllPosts: () => {
    // Error passed along from interceptor so front end has a chance to handle error too.
    return exampleApi.getPosts().catch(e => {
      alert('There was an error');
      return e;
    });
  },
  onGetSinglePost: () => {
    return exampleApi.getPost(3).catch(e => {
      alert('There was an error');
      return e;
    });
  },
  onGetSinglePostComments: () => {
    return exampleApi.getPostComments(3).catch(e => {
      alert('There was an error');
      return e;
    });
  },
}

// Using ReactDOM that we imported which has a method to render a
// React component ('App') into a particular element that exists in the DOM ('#app')
ReactDOM.render(
  <App {...props} />, // Spread the props from above into the component
  document.getElementById('app'),
);
