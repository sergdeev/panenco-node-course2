import { UserBody } from '../../../contracts/user.body.js';
import { UserStore } from './user.store.js';

export const create = async (
  body: UserBody
) => {
  const user = UserStore.add(body);

  return user;
};
