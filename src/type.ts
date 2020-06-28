import {RouterState} from "connected-react-router";

export interface LoadingState {
    [loading: string]: number;
}

export interface State {
    loading: LoadingState;
    app: {};
    router: RouterState;
}
