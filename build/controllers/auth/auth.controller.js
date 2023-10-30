function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
import { Representer, StatusCode } from '@panenco/papi';
import { Body, JsonController, Post } from 'routing-controllers';
import { AccessTokenView } from '../../contracts/accessToken.view.js';
import { LoginBody } from '../../contracts/login.body.js';
import { login } from './handlers/login.handler.js';
import { OpenAPI } from 'routing-controllers-openapi';
let AuthController = class AuthController {
    async create(body) {
        return login(body);
    }
};
_ts_decorate([
    Post('/tokens'),
    OpenAPI({
        summary: 'Login user, get token'
    }),
    Representer(AccessTokenView, StatusCode.ok),
    _ts_param(0, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof LoginBody === "undefined" ? Object : LoginBody
    ])
], AuthController.prototype, "create", null);
AuthController = _ts_decorate([
    JsonController('/auth')
], AuthController);
export { AuthController as default };

//# sourceMappingURL=auth.controller.js.map