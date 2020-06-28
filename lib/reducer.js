import { __assign, __read, __spread } from "tslib";
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { app } from "./app";
var SET_STATE_ACTION = "@@framework/setState";
export function setStateAction(module, state, type) {
    return {
        type: type,
        name: SET_STATE_ACTION,
        payload: { module: module, state: state },
    };
}
function setStateReducer(state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    if (action.name === SET_STATE_ACTION) {
        var _b = action.payload, module_1 = _b.module, moduleState = _b.state;
        return __assign(__assign({}, state), (_a = {}, _a[module_1] = __assign(__assign({}, state[module_1]), moduleState), _a));
    }
    return state;
}
export var LOADING_ACTION = "@@framework/loading";
export function loadingAction(show, identifier) {
    if (identifier === void 0) { identifier = "global"; }
    return {
        type: LOADING_ACTION,
        payload: { identifier: identifier, show: show },
    };
}
function loadingReducer(state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    if (action.type === LOADING_ACTION) {
        var payload = action.payload;
        var count = state[payload.identifier] || 0;
        return __assign(__assign({}, state), (_a = {}, _a[payload.identifier] = count + (payload.show ? 1 : -1), _a));
    }
    return state;
}
export function rootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        loading: loadingReducer,
        app: setStateReducer,
    });
}
export function showLoading(state, identifier) {
    if (identifier === void 0) { identifier = "global"; }
    return state.loading[identifier] > 0;
}
export var executeMethodMiddleware = (function (store) { return function (next) { return function (action) {
    var result = next(action);
    var handler = app.actionHandlers[action.type];
    if (!!handler) {
        handler.apply(void 0, __spread(action.payload));
    }
    return result;
}; }; });
//# sourceMappingURL=reducer.js.map