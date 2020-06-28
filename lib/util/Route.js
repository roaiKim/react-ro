import { __assign, __extends, __rest } from "tslib";
import React from "react";
import { Redirect, Route as ReactRouterDOMRoute } from "react-router-dom";
var Route = /** @class */ (function (_super) {
    __extends(Route, _super);
    function Route() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Route.prototype.render = function () {
        var _a = this.props, component = _a.component, accessCondition = _a.accessCondition, unauthorizedRedirectTo = _a.unauthorizedRedirectTo, restProps = __rest(_a, ["component", "accessCondition", "unauthorizedRedirectTo"]);
        var TargetComponent = component;
        return React.createElement(ReactRouterDOMRoute, __assign({}, restProps, { render: function (props) { return (accessCondition ? React.createElement(TargetComponent, __assign({}, props)) : React.createElement(Redirect, { to: { pathname: unauthorizedRedirectTo } })); } }));
    };
    Route.defaultProps = {
        exact: true,
        accessCondition: true,
        unauthorizedRedirectTo: "/",
    };
    return Route;
}(React.PureComponent));
export { Route };
//# sourceMappingURL=Route.js.map