import { NotFound } from "@panenco/papi";
import { UserBody } from "../../../contracts/user.body.js";
import { RequestContext } from "@mikro-orm/core";
import { User } from "../../../entities/user.entity.js";

export const update = async (id: string, body: UserBody) => {
  const em = RequestContext.getEntityManager();
  const user = em.findOne(User, { id });
  if (!user) {
    throw new NotFound("userNotFound", "User not found");
  }
  user.assign(body);
  await em.flush();
  return user;
};
