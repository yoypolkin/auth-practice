import passport from 'passport';
import { localStrategy } from './local-strategy.js';
import { googleStrategy } from './google-strategy.js';
import { serializeUser, deserializeUser } from './serialize.js';

passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export default passport;
