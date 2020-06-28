import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory, History} from "history";
import {applyMiddleware, createStore, Store} from "redux";
import {ActionHandler} from "./module";
import { rootReducer, State, executeMethodMiddleware} from "./reducer";

declare const window: any;

interface App {
    readonly browserHistory: History;
    readonly store: Store<State>;
    readonly actionHandlers: {[actionType: string]: ActionHandler};
}

function createApp(): App {
    const browserHistory = createBrowserHistory();
    const store: Store<State> = createStore(rootReducer(browserHistory), applyMiddleware(routerMiddleware(browserHistory), executeMethodMiddleware));

    return {
        browserHistory,
        store,
        actionHandlers: {}
    };
}

export const app = createApp();
