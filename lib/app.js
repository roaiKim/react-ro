import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer, executeMethodMiddleware, LOADING_ACTION } from './reducer';
function composeWithDevTools(enhancer) {
    var composeEnhancers = compose;
    if (process.env.NODE_ENV !== 'production') {
        var extension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        if (extension) {
            composeEnhancers = extension({
                // Ref: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
                actionsBlacklist: [LOADING_ACTION],
            });
        }
    }
    return composeEnhancers(enhancer);
}
function createApp() {
    var browserHistory = createBrowserHistory();
    var store = createStore(rootReducer(browserHistory), composeWithDevTools(applyMiddleware(routerMiddleware(browserHistory), executeMethodMiddleware)));
    return {
        browserHistory: browserHistory,
        store: store,
        actionHandlers: {},
    };
}
export var app = createApp();
//# sourceMappingURL=app.js.map