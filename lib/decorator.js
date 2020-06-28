import { __awaiter, __generator, __read, __spread } from "tslib";
import { app } from "./app";
import { loadingAction } from "./reducer";
export function createActionHandlerDecorator(interceptor) {
    return function (target, propertyKey, descriptor) {
        var fn = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var rootState = app.store.getState();
            interceptor(fn.bind.apply(fn, __spread([this], args)), rootState);
        };
        return descriptor;
    };
}
export function Loading(identifier) {
    var _this = this;
    if (identifier === void 0) { identifier = "global"; }
    return createActionHandlerDecorator(function (handler) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 2, 3]);
                    app.store.dispatch(loadingAction(true, identifier));
                    return [4 /*yield*/, handler()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    app.store.dispatch(loadingAction(false, identifier));
                    return [7 /*endfinally*/];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
export function Lifecycle() {
    return function (target, propertyKey, descriptor) {
        descriptor.value.isLifecycle = true;
        return descriptor;
    };
}
//# sourceMappingURL=decorator.js.map