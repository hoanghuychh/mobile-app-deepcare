import React from 'react';
//Redux
import { createStore, applyMiddleware } from "redux";
import {Provider} from "react-redux";
//Redux saga
import createSagaMiddleware from "redux-saga";
import {AppRegistry} from 'react-native';
import {createAppContainer} from 'react-navigation';
import allReducers from "./src/reducers/Index";
import rootSaga from "./src/sagas/rootSaga";
import DeepcareApp from './src/DeepcareApp';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));

const App = () => <Provider store={store}>
        <DeepcareApp />
      </Provider>

sagaMiddleware.run(rootSaga);

AppRegistry.registerComponent('Deepcare_V1', () => App);
