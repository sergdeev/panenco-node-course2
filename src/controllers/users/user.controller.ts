import { NextFunction, Request, Response } from "express";

import { UserBody } from "../../contracts/user.body.js";
import { create } from "./handlers/create.handler.js";
import { deleteUser } from "./handlers/delete.handler.js";
import { get } from "./handlers/get.handler.js";
import { getList } from "./handlers/getList.handler.js";
import { update } from "./handlers/update.handler.js";
import {
  Authorized,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
} from "routing-controllers";
import {
  Body,
  ListRepresenter,
  Query,
  Representer,
  StatusCode,
} from "@panenco/papi";
import { SearchQuery } from "../../contracts/search.query.js";
import { UserView } from "../../contracts/user.view.js";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController("/users")
export class UserController {
  @Post()
  @OpenAPI({ summary: "Create a new user" })
  @Representer(UserView, StatusCode.created)
  async create(@Body() body: UserBody) {
    return create(body);
  }

  @Get()
  @Authorized()
  @OpenAPI({ summary: "Get users list" })
  @ListRepresenter(UserView)
  async getList(@Query() query: SearchQuery) {
    return getList(query.search);
  }

  @Get("/:id")
  @Authorized()
  @OpenAPI({ summary: "Get a user by id" })
  @Representer(UserView)
  async get(@Param("id") id: string) {
    return get(id);
  }

  @Patch("/:id")
  @Authorized()
  @OpenAPI({ summary: "Edit user" })
  @Representer(UserView)
  async update(
    @Param("id") id: string,
    @Body({}, { skipMissingProperties: true }) body: UserBody,
  ) {
    return update(id, body);
  }

  @Delete("/:id")
  @Authorized()
  @OpenAPI({ summary: "Delete user" })
  @Representer(null)
  async delete(@Param("id") id: string) {
    deleteUser(id);
    return null;
  }
}
