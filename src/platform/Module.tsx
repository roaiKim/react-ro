import { push, replace } from 'connected-react-router';
import { Location } from 'history';
import { app } from '../app';
import { LifecycleDecoratorFlag } from '../module';
import { setStateAction, State } from '../reducer';

export interface ModuleLifecycleListener<RouteParam extends {} = {}, HistoryState extends {} = {}> {
  onRegister: (() => void) & LifecycleDecoratorFlag;
  onRender: ((routeParameters: RouteParam, location: Location<HistoryState | undefined>) => void) & LifecycleDecoratorFlag;
  onDestroy: (() => void) & LifecycleDecoratorFlag;
}

export class Module<ModuleState extends {}, RouteParam extends {} = {}, HistoryState extends {} = {}, RootState extends State = State> implements ModuleLifecycleListener<RouteParam, HistoryState> {
  public constructor(public readonly name: string, private readonly initialState: ModuleState) {}

  onRegister() { }

  onRender(routeParameters: RouteParam, location: Location<HistoryState | undefined>) { }

  onDestroy() { }

  protected get state(): Readonly<ModuleState> {
    return this.rootState.app[this.name];
  }

  protected get rootState(): Readonly<RootState> {
    return app.store.getState() as Readonly<RootState>;
  }

  protected setState(newState: Partial<ModuleState>) {
    app.store.dispatch(setStateAction(this.name, newState, `@@${this.name}/setState[${Object.keys(newState).join(',')}]`));
  }

  protected setHistory(urlOrState: HistoryState | string, usePush = true) {
    if (typeof urlOrState === 'string') {
      app.store.dispatch(usePush ? push(urlOrState) : replace(urlOrState));
    } else {
      const currentURL = location.pathname + location.search;
      app.store.dispatch(usePush ? push(currentURL, urlOrState) : replace(currentURL, urlOrState));
    }
  }
}
