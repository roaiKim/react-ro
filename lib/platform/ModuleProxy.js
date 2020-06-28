import { __assign, __awaiter, __extends, __generator } from "tslib";
import React from 'react';
import { app } from '../app';
import { executeAction } from '../module';
import { setStateAction } from '../reducer';
var ModuleProxy = /** @class */ (function () {
    function ModuleProxy(module, actions) {
        this.module = module;
        this.actions = actions;
    }
    ModuleProxy.prototype.getActions = function () {
        return this.actions;
    };
    ModuleProxy.prototype.attachLifecycle = function (ComponentType, config) {
        var _a;
        if (config === void 0) { config = {}; }
        var moduleName = this.module.name;
        var initialState = this.module.initialState;
        var lifecycleListener = this.module;
        var actions = this.actions;
        return _a = /** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1(props) {
                    var _this = _super.call(this, props) || this;
                    _this.lifecycleSaga();
                    return _this;
                }
                class_1.prototype.componentDidUpdate = function (prevProps) {
                    var prevLocation = prevProps.location;
                    var currentLocation = this.props.location;
                    var currentRouteParams = this.props.match ? this.props.match.params : null;
                    if (currentLocation && currentRouteParams && prevLocation !== currentLocation && lifecycleListener.onRender.isLifecycle) {
                        app.store.dispatch(actions.onRender(currentRouteParams, currentLocation));
                    }
                };
                class_1.prototype.componentWillUnmount = function () {
                    if (lifecycleListener.onDestroy.isLifecycle) {
                        app.store.dispatch(actions.onDestroy());
                    }
                    if (!config.retainStateOnLeave) {
                        app.store.dispatch(setStateAction(moduleName, initialState, "@@" + moduleName + "/@@reset"));
                    }
                };
                class_1.prototype.lifecycleSaga = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var props;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    props = this.props;
                                    if (!lifecycleListener.onRender.isLifecycle) return [3 /*break*/, 4];
                                    if (!('match' in props && 'location' in props)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, executeAction(lifecycleListener.onRender.bind(lifecycleListener), props.match.params, props.location)];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, executeAction(lifecycleListener.onRender.bind(lifecycleListener), {}, app.browserHistory)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                };
                class_1.prototype.render = function () {
                    return React.createElement(ComponentType, __assign({}, this.props));
                };
                return class_1;
            }(React.PureComponent)),
            _a.displayName = "ModuleBoundary(" + moduleName + ")",
            _a;
    };
    return ModuleProxy;
}());
export { ModuleProxy };
//# sourceMappingURL=ModuleProxy.js.map