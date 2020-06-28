import {connectRouter} from "connected-react-router";
import {History} from "history";
import {Action as ReduxAction, combineReducers, Reducer, Store, Dispatch, AnyAction, Middleware} from "redux";
import {State, LoadingState} from "./type";
import {app} from "./app";

export {LoadingState};

export {State};

export interface Action<P> extends ReduxAction<string> {
    name?: string;
    payload: P;
}

const SET_STATE_ACTION = "@@framework/setState";

interface SetStateActionPayload {
    module: string;
    state: any;
}

export function setStateAction(module: string, state: object, type: string): Action<SetStateActionPayload> {
    return {
        type,
        name: SET_STATE_ACTION,
        payload: {module, state},
    };
}

function setStateReducer(state: State["app"] = {}, action: Action<any>): State["app"] {
    if (action.name === SET_STATE_ACTION) {
        const {module, state: moduleState} = action.payload as SetStateActionPayload;
        return {...state, [module]: {...state[module], ...moduleState}};
    }
    return state;
}

interface LoadingActionPayload {
    identifier: string;
    show: boolean;
}

export const LOADING_ACTION = "@@framework/loading";

export function loadingAction(show: boolean, identifier: string = "global"): Action<LoadingActionPayload> {
    return {
        type: LOADING_ACTION,
        payload: {identifier, show},
    };
}

function loadingReducer(state: LoadingState = {}, action: Action<LoadingActionPayload>): LoadingState {
    if (action.type === LOADING_ACTION) {
        const payload = action.payload as LoadingActionPayload;
        const count = state[payload.identifier] || 0;
        return {
            ...state,
            [payload.identifier]: count + (payload.show ? 1 : -1),
        };
    }
    return state;
}

export function rootReducer(history: History): Reducer<State> {
    return combineReducers<State>({
        router: connectRouter(history),
        loading: loadingReducer,
        app: setStateReducer,
    });
}

export function showLoading(state: State, identifier: string = "global") {
    return state.loading[identifier] > 0;
}

export const executeMethodMiddleware: Middleware = ((store: Store<State>) => (next: Dispatch<AnyAction>) => (action: Action<any>) => {
    const result = next(action);
    const handler = app.actionHandlers[action.type];
    if (!!handler) {
        handler(...action.payload);
    }
    return result;
}) as Middleware
