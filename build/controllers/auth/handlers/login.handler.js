import { Unauthorized, createAccessToken } from '@panenco/papi';
import { RequestContext } from '@mikro-orm/core';
import { User } from '../../../entities/user.entity.js';
export const login = async (body)=>{
    const em = RequestContext.getEntityManager();
    const user = em.findOne(User, {
        email: body.email
    });
    if (!user || user.password !== body.password) {
        throw new Unauthorized('unauthorized', 'Invalid credentials');
    }
    const token = await createAccessToken('jwtSecretFromConfigHere', 60 * 10, {
        userId: user.id
    }); // Important this secret is also used for the authenticator initialization in app.ts
    return token;
};

//# sourceMappingURL=login.handler.js.map