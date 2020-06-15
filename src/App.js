/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/root.reducers';
import Root from './routes';
import './App.scss';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunkMiddleware)));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
