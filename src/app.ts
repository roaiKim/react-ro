import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, createStore, Store, StoreEnhancer, compose } from 'redux';
import { ActionHandler } from './module';
import { rootReducer, State, executeMethodMiddleware, LOADING_ACTION } from './reducer';

declare const window: any;

function composeWithDevTools(enhancer: StoreEnhancer): StoreEnhancer {
  let composeEnhancers = compose;
  if (process.env.NODE_ENV !== 'production') {
    const extension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (extension) {
      composeEnhancers = extension({
        // Ref: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
        actionsBlacklist: [LOADING_ACTION],
      });
    }
  }
  return composeEnhancers(enhancer);
}

interface App {
  readonly browserHistory: History;
  readonly store: Store<State>;
  readonly actionHandlers: {[actionType: string]: ActionHandler};
}

function createApp(): App {
  const browserHistory = createBrowserHistory();
  const store: Store<State> = createStore(rootReducer(browserHistory), composeWithDevTools(applyMiddleware(routerMiddleware(browserHistory), executeMethodMiddleware)));

  return {
    browserHistory,
    store,
    actionHandlers: {},
  };
}

export const app = createApp();
