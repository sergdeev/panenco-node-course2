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
import { UserBody } from '../../contracts/user.body.js';
import { create } from './handlers/create.handler.js';
import { deleteUser } from './handlers/delete.handler.js';
import { get } from './handlers/get.handler.js';
import { getList } from './handlers/getList.handler.js';
import { update } from './handlers/update.handler.js';
import { Authorized, Delete, Get, JsonController, Param, Patch, Post } from 'routing-controllers';
import { Body, ListRepresenter, Query, Representer, StatusCode } from '@panenco/papi';
import { SearchQuery } from '../../contracts/search.query.js';
import { UserView } from '../../contracts/user.view.js';
import { OpenAPI } from 'routing-controllers-openapi';
export let UserController = class UserController {
    async create(body) {
        return create(body);
    }
    async getList(query) {
        return getList(query.search);
    }
    async get(id) {
        return get(id);
    }
    async update(id, body) {
        return update(id, body);
    }
    async delete(id) {
        deleteUser(id);
        return null;
    }
};
_ts_decorate([
    Post(),
    OpenAPI({
        summary: 'Create a new user'
    }),
    Representer(UserView, StatusCode.created),
    _ts_param(0, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof UserBody === "undefined" ? Object : UserBody
    ])
], UserController.prototype, "create", null);
_ts_decorate([
    Get(),
    Authorized(),
    OpenAPI({
        summary: 'Get users list'
    }),
    ListRepresenter(UserView),
    _ts_param(0, Query()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof SearchQuery === "undefined" ? Object : SearchQuery
    ])
], UserController.prototype, "getList", null);
_ts_decorate([
    Get('/:id'),
    Authorized(),
    OpenAPI({
        summary: 'Get a user by id'
    }),
    Representer(UserView),
    _ts_param(0, Param('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ])
], UserController.prototype, "get", null);
_ts_decorate([
    Patch('/:id'),
    Authorized(),
    OpenAPI({
        summary: 'Edit user'
    }),
    Representer(UserView),
    _ts_param(0, Param('id')),
    _ts_param(1, Body({}, {
        skipMissingProperties: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof UserBody === "undefined" ? Object : UserBody
    ])
], UserController.prototype, "update", null);
_ts_decorate([
    Delete('/:id'),
    Authorized(),
    OpenAPI({
        summary: 'Delete user'
    }),
    Representer(null),
    _ts_param(0, Param('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ])
], UserController.prototype, "delete", null);
UserController = _ts_decorate([
    JsonController('/users')
], UserController);

//# sourceMappingURL=user.controller.js.map