import { ConnectedRouter } from 'connected-react-router';
import React, { ComponentType } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router';
import { app } from '../app';

interface BootstrapOption {
  componentType: ComponentType<{}>
}

function renderDOM(EntryComponent: ComponentType<any>) {
  const rootElement: HTMLDivElement = document.createElement('div');
  rootElement.style.transition = 'all 150ms ease-in 100ms';
  rootElement.style.opacity = '0';
  rootElement.style.transform = 'translateY(-10px) scale(0.96)';
  rootElement.id = 'framework-app-root';
  document.body.appendChild(rootElement);

  const RoutedEntryComponent = withRouter(EntryComponent);
  ReactDOM.render(
    <Provider store={app.store}>
      <ConnectedRouter history={app.browserHistory}>
        <RoutedEntryComponent />
      </ConnectedRouter>
    </Provider>,
    rootElement,
    () => {
      const rootElement = document.getElementById('framework-app-root')!;
      rootElement.style.transform = 'none';
      rootElement.style.opacity = '1';
    },
  );
}

export function startApp(config: BootstrapOption): void {
  renderDOM(config.componentType);
}
