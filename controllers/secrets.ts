import { Request, Response } from 'express';

export function secrets(req: Request, res: Response) {
  /**
   * isAuthenticated is added by passport middleware.
   * It will be true if there is and auth object exists after deserializing the request user.
   */
  if (req.isAuthenticated()) {
    res.render('secrets.ejs');
  } else {
    res.redirect('/auth');
  }
}
