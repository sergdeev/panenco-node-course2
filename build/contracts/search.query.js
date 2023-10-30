function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
import { Exclude, Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
export let SearchQuery = class SearchQuery {
    search;
};
_ts_decorate([
    Expose(),
    IsString(),
    IsOptional(),
    _ts_metadata("design:type", String)
], SearchQuery.prototype, "search", void 0);
SearchQuery = _ts_decorate([
    Exclude()
], SearchQuery);

//# sourceMappingURL=search.query.js.map