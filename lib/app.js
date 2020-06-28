import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { rootReducer, executeMethodMiddleware } from "./reducer";
function createApp() {
    var browserHistory = createBrowserHistory();
    var store = createStore(rootReducer(browserHistory), applyMiddleware(routerMiddleware(browserHistory), executeMethodMiddleware));
    return {
        browserHistory: browserHistory,
        store: store,
        actionHandlers: {}
    };
}
export var app = createApp();
//# sourceMappingURL=app.js.map