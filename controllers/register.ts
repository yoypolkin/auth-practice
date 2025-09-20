import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../user-entity-manager/find-user-by-email.js';
import { createUser } from '../user-entity-manager/create-user.js';

export function getRegistrationPage(req: Request, res: Response) {
  res.render('register.ejs');
}

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  const saltRounds = 10;

  try {
    const user = await findUserByEmail(username);

    if (user && user.email) {
      res.send('Email already exists. Try logging in.');
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
        } else {
          const user = await createUser(username, hash);

          /**
           * This means:
           * - “Passport, please create a session for this user”
           * - Store that user’s ID in the session
           * - Immediately set req.user = user
           * - Then redirect when ready
           *
           * Behind the scenes, this happens:
           * - req.login(user, ...) is called
           * - Passport runs serializeUser(user, done) function
           * - passport.serializeUser((user, done) => {
           *      done(null, user.id); // saves user.id in session
           *   });
           * - Express-session stores that ID in:
           *   req.session.passport = { user: user.id }
           * - On future requests, passport.session() reads that and:
           * - Calls deserializeUser(userId, done)
           * - Sets req.user to the result
           */
          req.login(user, (err) => {
            console.log(err);
            res.redirect('/secrets');
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
}
