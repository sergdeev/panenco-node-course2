import { NextFunction, Request, Response } from 'express';

import { UserBody } from '../../contracts/user.body.js';
import { create } from './handlers/create.handler.js';
import { deleteUser } from './handlers/delete.handler.js';
import { get } from './handlers/get.handler.js';
import { getList } from './handlers/getList.handler.js';
import { update } from './handlers/update.handler.js';
import { Delete, Get, JsonController, Param, Patch, Post, UseBefore } from 'routing-controllers';
import { Body, Query } from '@panenco/papi';
import { SearchQuery } from '../../contracts/search.query.js';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.header("auth") !== "api-key") {
    return res.status(401).send("Unauthorized");
  }
  next();
};

@JsonController('/users')
export class UserController {
	@Post()
	@UseBefore(adminMiddleware)
	async create(@Body() body: UserBody) {
		return create(body);
	}

	@Get()
	async getList(@Query() query: SearchQuery) {
		return getList(query.search);
	}

	@Get('/:id')
	async get(@Param('id') id: string) {
		return get(id);
	}

	@Patch('/:id')
	async update(@Param('id') id: string, @Body({}, {skipMissingProperties: true}) body: UserBody) {
		return update(id, body);
	}

	@Delete('/:id')
	async delete(@Param('id') id: string) {
		deleteUser(id);
		return null;
	}
}