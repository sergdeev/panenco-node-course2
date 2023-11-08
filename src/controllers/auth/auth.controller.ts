import { Representer, StatusCode } from "@panenco/papi";
import { Body, JsonController, Post } from "routing-controllers";
import { AccessTokenView } from "../../contracts/accessToken.view.js";
import { LoginBody } from "../../contracts/login.body.js";
import { login } from "./handlers/login.handler.js";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController("/auth")
export default class AuthController {
  @Post("/tokens")
  @OpenAPI({ summary: "Login user, get token" })
  @Representer(AccessTokenView, StatusCode.ok)
  async create(@Body() body: LoginBody) {
    return login(body);
  }
}
