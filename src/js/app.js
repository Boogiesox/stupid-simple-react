import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import ExampleApi from './api';

const exampleApi = new ExampleApi;

const props = {
  onGetAllPosts: () => {
    // Error passed along from interceptor so front end has a chance to handle error too.
    return exampleApi.getPosts();
  },
  onGetSinglePost: () => {
    return exampleApi.getPost(3);
  },
  onGetSinglePostComments: () => {
    return exampleApi.getPostComments(3);
  },
  onGetError404: () => {
    return exampleApi.getError404();
  }
}

// Using ReactDOM that we imported which has a method to render a
// React component ('App') into a particular element that exists in the DOM ('#app')
ReactDOM.render(
  <App {...props} />, // Spread the props from above into the component
  document.getElementById('app'),
);
