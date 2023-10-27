import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response, Router } from 'express';

import { UserBody } from '../../contracts/user.body.js';
import { UserView } from '../../contracts/user.view.js';
import { create } from './handlers/create.handler.js';
import { deleteUser } from './handlers/delete.handler.js';
import { get } from './handlers/get.handler.js';
import { getList } from './handlers/getList.handler.js';
import { update } from './handlers/update.handler.js';
import { Delete, Get, JsonController, Patch, Post } from 'routing-controllers';
import { Body } from '@panenco/papi';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.header("auth") !== "api-key") {
    return res.status(401).send("Unauthorized");
  }
  next();
};

const representationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transformed = plainToInstance(UserView, res.locals.body);
  res.json(transformed);
};


@JsonController('/users')
export class UserController {
  // constructor() {
  //   this.router = Router();
  //   this.path = "users";

  //   this.router.post("/", adminMiddleware, create);
  //   this.router.patch(
  //     "/:id",
  //     patchValidationMiddleware,
  //     update,
  //     representationMiddleware
  //   );
  // }

  @Post()
  async create(@Body() body: UserBody) {
    return create();
  }

  @Get()
  async getList() {
    return getList();
  }

  @Get('/:id')
  async get() {
    return get();
  }

  @Patch('/:id')
  async update(@Body({}, {skipMissingProperties: true}) body: UserBody) {
    return update();
  }

  @Delete('/:id')
  async delete() {
    return deleteUser();
  }
}
