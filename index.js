import React from 'react';
//Redux
import { createStore, applyMiddleware } from "redux";
import {Provider} from "react-redux";
//Redux saga
import createSagaMiddleware from "redux-saga";
import {AppRegistry} from 'react-native';
import {createAppContainer} from 'react-navigation';
import 'proxy-polyfill';
import allReducers from "./src/reducers/Index";
import rootSaga from "./src/sagas/rootSaga";
import MainNavigator from './src';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
const AppContainer = createAppContainer(MainNavigator);


const App = () => <Provider store={store}>
        <AppContainer />
      </Provider>

sagaMiddleware.run(rootSaga);


// Ignore specific yellowbox warnings
//YellowBox.ignoreWarnings(["Require cycle:", "Remote debugger", "Setting a timer"]);

AppRegistry.registerComponent('amcoming', () => App);
