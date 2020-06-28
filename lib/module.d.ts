import { Module, ModuleLifecycleListener } from "./platform/Module";
import { ModuleProxy } from "./platform/ModuleProxy";
import { Action } from "./reducer";
export interface LifecycleDecoratorFlag {
    isLifecycle?: boolean;
}
export declare type ActionHandler = (...args: any[]) => any;
declare type ActionCreator<H> = H extends (...args: infer P) => any ? ((...args: P) => Action<P>) : never;
declare type HandlerKeys<H> = {
    [K in keyof H]: H[K] extends (...args: any[]) => any ? K : never;
}[Exclude<keyof H, keyof ModuleLifecycleListener>];
export declare type ActionCreators<H> = {
    readonly [K in HandlerKeys<H>]: ActionCreator<H[K]>;
};
export declare function register<M extends Module<any>>(module: M): ModuleProxy<M>;
export declare function executeAction(handler: ActionHandler, ...payload: any[]): Promise<void>;
export {};
