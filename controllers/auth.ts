import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export function getLoginPage(req: Request, res: Response) {
  res.render('login.ejs');
}

/**
 * Under the hood:
 * - The user submits a login form (POST /login) with email and password
 * - passport.authenticate('local')
 * - Looks for passport.use(new Strategy(...)
 * - Calls the verify function that strategy
 * - If login succeeds:
 * - req.login(user) is automatically called
 * - req.user is set
 * - Redirect to /secrets
 * - If login fails:
 * - Redirect to /login
 */
export function login(req: Request, res: Response, next: NextFunction) {
  console.log('Im inside post login local');
  passport.authenticate('local', {
    successRedirect: '/secrets',
    failureRedirect: '/auth',
  })(req, res, next);
}

export function googleAuth(req: Request, res: Response, next: NextFunction) {
  // Passport middleware should be used directly. No wrapper function.
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
}

export function googleAuthCallback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Here GET is required. Google will redirect with GET.
  return passport.authenticate('google', {
    successRedirect: '/secrets',
    failureRedirect: '/login',
  })(req, res, next);
}
