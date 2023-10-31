import { RequestContext } from '@mikro-orm/core';
import { User } from '../../../entities/user.entity.js';
export const create = async (body)=>{
    const em = RequestContext.getEntityManager();
    const user = em.create(User, body);
    await em.persistAndFlush(user);
    return user;
};

//# sourceMappingURL=create.handler.js.map