import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import Container from '@material-ui/core/Container';

import rootSaga from './store/saga';
import rootReducer from './store/reducers';

import Home from './layouts/Home';
import Header from './components/Header';

import styles from './app.scss';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development' ? composeEnhancers(applyMiddleware(sagaMiddleware)) : applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <div className="appContainer">
        <header className="headerContainer">
          <Header />
        </header>
        <div className="appContent">
          <Container className="page">
            <Home />
          </Container>
        </div>
      </div>
    </Provider>
  );
}

export default App;
