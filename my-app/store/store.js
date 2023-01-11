import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
      return next(action);
    }
  
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());
  
    next(action);
  
    console.log('next state: ', store.getState());
};
;
// const middleWares = [loggerMiddleware];
// const middleWares = [process.env.NODE_ENV === 'development' && logger, thunk].filter(
//     Boolean
// );

const middleWares = [logger, thunk].filter(
  Boolean
);

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

  // const composeEnhancer = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const composeEnhancer = compose;

const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: ["user"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);

// export const wrapper = createWrapper(persistor);