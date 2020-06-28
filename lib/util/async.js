import { __assign, __extends } from "tslib";
import React from "react";
export function async(resolve, component, loadingComponent) {
    if (loadingComponent === void 0) { loadingComponent = null; }
    return /** @class */ (function (_super) {
        __extends(AsyncWrapperComponent, _super);
        function AsyncWrapperComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                Component: null,
            };
            return _this;
        }
        AsyncWrapperComponent.prototype.componentDidMount = function () {
            var _this = this;
            var promise = resolve();
            promise.then(function (module) {
                var Component = module[component];
                _this.setState({ Component: Component });
            });
        };
        AsyncWrapperComponent.prototype.render = function () {
            var Component = this.state.Component;
            return Component ? React.createElement(Component, __assign({}, this.props)) : loadingComponent;
        };
        return AsyncWrapperComponent;
    }(React.PureComponent));
}
//# sourceMappingURL=async.js.map