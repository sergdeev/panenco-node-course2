import { RequestContext } from '@mikro-orm/core';
import { NotFound } from '@panenco/papi';
import { User } from '../../../../build/entities/user.entity.js';
export const get = (id)=>{
    const em = RequestContext.getEntityManager();
    const user = em.findOne(User, {
        id
    });
    if (!user) {
        throw new NotFound('userNotFound', 'User not found');
    }
    return user;
};

//# sourceMappingURL=get.handler.js.map