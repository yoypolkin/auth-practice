import { Request, Response } from 'express';

export function logout(req: Request, res: Response) {
  req.logout((err) => {
    if (err) console.log(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // Default cookie name for express-session
      res.redirect('/');
    });
  });
}
