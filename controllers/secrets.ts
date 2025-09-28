import { Request, Response } from 'express';
import { SessionUser } from '../types/user.js';

export function getSecretsPage(req: Request, res: Response) {
  /**
   * isAuthenticated is added by passport middleware.
   * It will be true if there is and auth object exists after deserializing the request user.
   */
  if (req.isAuthenticated()) {
    const user: SessionUser = req.user;
    console.log('I am in getSecretsPage controller', user);

    res.render('secrets.ejs', { secret: 'Dammy secret', name: user.email });
  } else {
    res.redirect('/auth');
  }
}
