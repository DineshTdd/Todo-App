import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers } from 'redux'; // standalone redux store import
import { Provider } from 'react-redux'; // connects redux to react

import './index.css';
import Spinner from './Components/Spinner/Spinner';
import todoReducer from './store/reducers/_todo';

import * as serviceWorker from './serviceWorker';

//import App from './App'; lazy loading
const App = React.lazy(() => import('./App'));

// combine multiple reducers to one rootReducer
const rootReducer = combineReducers({
  todo: todoReducer
});

// store for our app
const store = createStore(rootReducer);

ReactDOM.render(<Suspense fallback={<Spinner />}>
    <section>
      <Provider store = { store }>
      <App />
      </Provider>
    </section>
    </Suspense>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
