import React from 'react';
import { RouteComponentProps } from 'react-router';
import { app } from '../app';
import { ActionCreators, executeAction } from '../module';
import { setStateAction } from '../reducer';
import { Module, ModuleLifecycleListener } from './Module';

interface AttachLifecycleOption {
  retainStateOnLeave?: boolean;
}

export class ModuleProxy<M extends Module<any>> {
  public constructor(private module: M, private actions: ActionCreators<M>) {}

  public getActions(): ActionCreators<M> {
    return this.actions;
  }

  public attachLifecycle<P extends {}>(ComponentType: React.ComponentType<P>, config: AttachLifecycleOption = {}): React.ComponentType<P> {
    const moduleName = this.module.name;
    const { initialState } = this.module as any;
    const lifecycleListener = this.module as ModuleLifecycleListener;
    const actions = this.actions as any;

    return class extends React.PureComponent<P> {
      public static displayName = `ModuleBoundary(${moduleName})`;

      constructor(props: P) {
        super(props);
        this.lifecycleSaga();
      }

      componentDidUpdate(prevProps: Readonly<P>) {
        const prevLocation = (prevProps as any).location;
        const currentLocation = (this.props as any).location;
        const currentRouteParams = (this.props as any).match ? (this.props as any).match.params : null;
        if (currentLocation && currentRouteParams && prevLocation !== currentLocation && lifecycleListener.onRender.isLifecycle) {
          app.store.dispatch(actions.onRender(currentRouteParams, currentLocation));
        }
      }

      componentWillUnmount() {
        if (lifecycleListener.onDestroy.isLifecycle) {
          app.store.dispatch(actions.onDestroy());
        }

        if (!config.retainStateOnLeave) {
          app.store.dispatch(setStateAction(moduleName, initialState, `@@${moduleName}/@@reset`));
        }
      }

      private async lifecycleSaga() {
        const props = this.props as (RouteComponentProps | {});
        if (lifecycleListener.onRender.isLifecycle) {
          if ('match' in props && 'location' in props) {
            await executeAction(lifecycleListener.onRender.bind(lifecycleListener), props.match.params, props.location);
          } else {
            await executeAction(lifecycleListener.onRender.bind(lifecycleListener), {}, app.browserHistory);
          }
        }
      }

      render() {
        return <ComponentType {...this.props} />;
      }
    };
  }
}
