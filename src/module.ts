import {app} from "./app";
import {Module, ModuleLifecycleListener} from "./platform/Module";
import {ModuleProxy} from "./platform/ModuleProxy";
import {Action, setStateAction} from "./reducer";

export interface LifecycleDecoratorFlag {
    isLifecycle?: boolean;
}

export type ActionHandler = (...args: any[]) => any;

type ActionCreator<H> = H extends (...args: infer P) => any ? ((...args: P) => Action<P>) : never;
type HandlerKeys<H> = {[K in keyof H]: H[K] extends (...args: any[]) => any ? K : never}[Exclude<keyof H, keyof ModuleLifecycleListener>];
export type ActionCreators<H> = {readonly [K in HandlerKeys<H>]: ActionCreator<H[K]>};

export function register<M extends Module<any>>(module: M): ModuleProxy<M> {
    const moduleName = module.name;
    if (!app.store.getState().app[moduleName]) {
        const initialState = (module as any).initialState;
        app.store.dispatch(setStateAction(moduleName, initialState, `@@${moduleName}/@@init`));
    }

    const actions: any = {};
    getKeys(module).forEach(actionType => {
        const method = module[actionType];
        const qualifiedActionType = `${moduleName}/${actionType}`;
        method.actionName = qualifiedActionType;
        actions[actionType] = (...payload: any[]): Action<any[]> => ({type: qualifiedActionType, payload});
        app.actionHandlers[qualifiedActionType] = method.bind(module);
    });

    const lifecycleListener = module as ModuleLifecycleListener;
    if (lifecycleListener.onRegister.isLifecycle) {
        app.store.dispatch(actions.onRegister());
    }

    return new ModuleProxy(module, actions);
}

export async function executeAction(handler: ActionHandler, ...payload: any[]) {
    try {
        await handler(...payload);
    } catch (error) {
        // TODO 这里需要错误处理
    }
}

function getKeys<M extends Module<any>>(module: M) {
    const keys: string[] = [];
    for (const propertyName of Object.getOwnPropertyNames(Object.getPrototypeOf(module))) {
        if (module[propertyName] instanceof Function && propertyName !== "constructor") {
            keys.push(propertyName);
        }
    }
    return keys;
}
