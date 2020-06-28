import { Location } from 'history';
import { LifecycleDecoratorFlag } from '../module';
import { State } from '../reducer';
export interface ModuleLifecycleListener<RouteParam extends {} = {}, HistoryState extends {} = {}> {
    onRegister: (() => void) & LifecycleDecoratorFlag;
    onRender: ((routeParameters: RouteParam, location: Location<HistoryState | undefined>) => void) & LifecycleDecoratorFlag;
    onDestroy: (() => void) & LifecycleDecoratorFlag;
}
export declare class Module<ModuleState extends {}, RouteParam extends {} = {}, HistoryState extends {} = {}, RootState extends State = State> implements ModuleLifecycleListener<RouteParam, HistoryState> {
    readonly name: string;
    private readonly initialState;
    constructor(name: string, initialState: ModuleState);
    onRegister(): void;
    onRender(routeParameters: RouteParam, location: Location<HistoryState | undefined>): void;
    onDestroy(): void;
    protected get state(): Readonly<ModuleState>;
    protected get rootState(): Readonly<RootState>;
    protected setState(newState: Partial<ModuleState>): void;
    protected setHistory(urlOrState: HistoryState | string, usePush?: boolean): void;
}
