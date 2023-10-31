import { RequestContext } from '@mikro-orm/core';
import { User } from '../../../entities/user.entity.js';

export const getList = (search: string) => {
  const em = RequestContext.getEntityManager();
  return em.findAndCount(User,
		search
			? {
				$or: [{name: {$ilike: `%${search}%`}}, {email: {$ilike: `%${search}%`}}],
			}
			: {}
	)
};
