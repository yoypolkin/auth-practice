import { Strategy } from 'passport-google-oauth20';
import { findUserByEmail } from '../../user-entity-manager/find-user-by-email.js';
import { createUser } from '../../user-entity-manager/create-user.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Redirects to Google login →
 * Redirects back to /auth/google/secrets →
 * Calls strategy callback (logs profile) →
 * Redirects to /secrets.
 *
 * What happens next:
 * Passport passes profile into serializeUser function:
 *    passport.serializeUser((user, done) => {
 *        done(null, user); // user here === profile
 *    }); → This decides what gets saved into the session (could be the whole profile, or just a DB user ID)
 * Later, for every request with that session, Passport runs deserializeUser:
 *    passport.deserializeUser((user, done) => {
 *        done(null, user); // restores the user for req.user
 *    }); → This attaches the user back to req.user in Express.
 *
 * ⚠️ Why you don’t want to just return profile.
 * Right now you’re handing Passport the raw Google profile. That means:
 * Nothing is persisted in your DB.
 * The session might store a huge object.
 * Each login is “fresh,” with no link to your app’s users.
 *
 * 👉 In production, you usually:
 * Check if a user with this Google ID already exists in your DB.
 * If yes → return that user.
 * If no → create a new user, then return it.
 */
export const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
  },
  async (accessToken, refreshToken, profile, verify) => {
    const email = profile._json.email;
    const profileId = profile.id;

    try {
      if (email) {
        const user = await findUserByEmail(email);

        if (user) {
          verify(null, user);
        } else {
          const newUser = await createUser(email, profileId);
          verify(null, newUser);
        }
      } else {
        console.log('No email was found during google auth!');
      }
    } catch (error) {
      verify(error as Error);
    }
  }
);
