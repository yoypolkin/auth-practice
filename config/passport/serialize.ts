import { SessionUser } from '../../types/user.js';
import { findUserById } from '../../user-entity-manager/find-user-by-id.js';

// Used by login() to save user to the session
export function serializeUser(
  user: any,
  done: (err: any, id?: unknown) => void
) {
  console.log('Inside serialize');
  done(null, user.id);
}

// Used by passport.session() to read the user data.
export async function deserializeUser(
  id: string,
  done: (err: any, user?: SessionUser | false | undefined | null) => void
) {
  console.log('Inside deserialize');
  try {
    const user = await findUserById(id);

    if (user && user.id) {
      done(null, { id: user.id, email: user.email });
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
}
