import { NotFound } from '@panenco/papi';
import { RequestContext } from '@mikro-orm/core';
import { User } from '../../../entities/user.entity.js';
export const update = async (id, body)=>{
    const em = RequestContext.getEntityManager();
    const user = em.findOne(User, {
        id
    });
    if (!user) {
        throw new NotFound('userNotFound', 'User not found');
    }
    user.assign(body);
    await em.flush();
    return user;
};

//# sourceMappingURL=update.handler.js.map