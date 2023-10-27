import { UserStore } from './user.store.js';
import { NotFound } from '@panenco/papi';
import { UserBody } from '../../../contracts/user.body.js';

export const update = (idString: string, body: UserBody) => {
  const id = Number(idString);
  const user = UserStore.get(id);
  if (!user) {
    throw new NotFound('userNotFound', 'User not found');
  }
  const updated = UserStore.update(id, {...user, ...body});
  return updated
};
