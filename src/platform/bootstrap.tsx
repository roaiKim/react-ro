import { ConnectedRouter } from 'connected-react-router';
import React, { ComponentType } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { app } from '../app';

interface BootstrapOption {
  entryComponent: React.ComponentType;
  rootContainer?: HTMLElement;
}

export function bootstrarp(option: BootstrapOption): void {
  renderRoot(option.entryComponent, option.rootContainer || injectRootContainer());
}

function renderRoot(EntryComponent: ComponentType<any>, rootContainer: HTMLElement) {
  ReactDOM.render(
    <Provider store={app.store}>
      <ConnectedRouter history={app.browserHistory}>
        <EntryComponent />
      </ConnectedRouter>
    </Provider>,
    rootContainer
  );
}

function injectRootContainer(): HTMLElement {
  const rootContainer = document.createElement("main");
  rootContainer.id = "react-app-root";
  document.body.appendChild(rootContainer);
  return rootContainer;
}
