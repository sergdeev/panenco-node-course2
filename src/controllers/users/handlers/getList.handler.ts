import { NextFunction, Request, Response } from 'express';

import { UserStore } from './user.store.js';

export const getList = (search: string) => {
  const users = UserStore.find(search);
  return users;
};
