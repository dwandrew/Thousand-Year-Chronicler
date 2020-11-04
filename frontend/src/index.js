import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from 'redux'
import RootReducer from './reducers/RootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

//firestore
import { getFirestore } from 'redux-firestore'
import { getFirebase } from 'react-redux-firebase'

const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirestore, getFirebase}))))

ReactDOM.render(
  <React.StrictMode>
    <Provider store= {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();