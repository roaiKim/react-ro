import { push, replace } from 'connected-react-router';
import { app } from '../app';
import { setStateAction } from '../reducer';
var Module = /** @class */ (function () {
    function Module(name, initialState) {
        this.name = name;
        this.initialState = initialState;
    }
    Module.prototype.onRegister = function () { };
    Module.prototype.onRender = function (routeParameters, location) { };
    Module.prototype.onDestroy = function () { };
    Object.defineProperty(Module.prototype, "state", {
        get: function () {
            return this.rootState.app[this.name];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "rootState", {
        get: function () {
            return app.store.getState();
        },
        enumerable: false,
        configurable: true
    });
    Module.prototype.setState = function (newState) {
        app.store.dispatch(setStateAction(this.name, newState, "@@" + this.name + "/setState[" + Object.keys(newState).join(',') + "]"));
    };
    Module.prototype.setHistory = function (urlOrState, usePush) {
        if (usePush === void 0) { usePush = true; }
        if (typeof urlOrState === 'string') {
            app.store.dispatch(usePush ? push(urlOrState) : replace(urlOrState));
        }
        else {
            var currentURL = location.pathname + location.search;
            app.store.dispatch(usePush ? push(currentURL, urlOrState) : replace(currentURL, urlOrState));
        }
    };
    return Module;
}());
export { Module };
//# sourceMappingURL=Module.js.map