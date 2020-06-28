import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router';
import { app } from '../app';
function renderDOM(EntryComponent) {
    var rootElement = document.createElement('div');
    rootElement.style.transition = 'all 150ms ease-in 100ms';
    rootElement.style.opacity = '0';
    rootElement.style.transform = 'translateY(-10px) scale(0.96)';
    rootElement.id = 'framework-app-root';
    document.body.appendChild(rootElement);
    var RoutedEntryComponent = withRouter(EntryComponent);
    ReactDOM.render(React.createElement(Provider, { store: app.store },
        React.createElement(ConnectedRouter, { history: app.browserHistory },
            React.createElement(RoutedEntryComponent, null))), rootElement, function () {
        var rootElement = document.getElementById('framework-app-root');
        rootElement.style.transform = 'none';
        rootElement.style.opacity = '1';
    });
}
export function startApp(config) {
    renderDOM(config.componentType);
}
//# sourceMappingURL=bootstrap.js.map