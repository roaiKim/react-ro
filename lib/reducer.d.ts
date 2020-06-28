import { History } from "history";
import { Action as ReduxAction, Reducer, Middleware } from "redux";
import { State, LoadingState } from "./type";
export { LoadingState };
export { State };
export interface Action<P> extends ReduxAction<string> {
    name?: string;
    payload: P;
}
interface SetStateActionPayload {
    module: string;
    state: any;
}
export declare function setStateAction(module: string, state: object, type: string): Action<SetStateActionPayload>;
interface LoadingActionPayload {
    identifier: string;
    show: boolean;
}
export declare const LOADING_ACTION = "@@framework/loading";
export declare function loadingAction(show: boolean, identifier?: string): Action<LoadingActionPayload>;
export declare function rootReducer(history: History): Reducer<State>;
export declare function showLoading(state: State, identifier?: string): boolean;
export declare const executeMethodMiddleware: Middleware;
