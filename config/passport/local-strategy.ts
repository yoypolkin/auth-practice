import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { findUserByEmail } from '../../user-entity-manager/find-user-by-email.js';
import { SessionUser } from '../../types/user.js';

/**
 * Being called by passport.authenticate()
 *
 * Here I define whatever strategy I want the user to be authenticated
 *
 * username and password params should be named in the same way as they are in the submittion form
 *
 * Official documentation:
 * https://www.passportjs.org/packages/passport-local/
 */
export const localStrategy = new Strategy(async function verify(
  username,
  password,
  cb
) {
  console.log('Im inside local strategy constructor');
  try {
    const user = await findUserByEmail(username);

    if (user && user.password) {
      const storedHashedPassword = String(user.password);
      const existingUser: SessionUser = {
        id: user.id,
        email: user.email,
      } as const;

      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          return cb(err);
        } else {
          if (result) {
            return cb(null, existingUser);
          } else {
            return cb(null, false);
          }
        }
      });
    } else {
      return cb('User was not found');
    }
  } catch (err) {
    return cb(err);
  }
});
