import { Unauthorized, createAccessToken } from '@panenco/papi';
import { LoginBody } from '../../../contracts/login.body.js';
import { UserStore } from '../../users/handlers/user.store.js';

export const login = async (
  body: LoginBody
) => {
  const user = UserStore.getByEmail(body.email);
  if (!user || user.password !== body.password) {
		throw new Unauthorized('unauthorized', 'Invalid credentials');
	}

  const token = await createAccessToken('jwtSecretFromConfigHere', 60 * 10, {
		userId: user.id,
	}); // Important this secret is also used for the authenticator initialization in app.ts
	return token;
};
