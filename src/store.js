import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk";
import admin from "./reducers/adminReducer.js";
import app from "./reducers/appReducer.js";

const logger = createLogger({});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  combineReducers({
    admin, app
  }),
  {},
 composeEnhancers(applyMiddleware(logger, thunk))
);
