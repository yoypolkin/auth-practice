import { Request, Response } from 'express';
import { SessionUser } from '../types/user.js';
import { getSecret } from '../user-entity-manager/get-secret.js';
import { addSecret } from '../user-entity-manager/add-secret.js';

export async function getSecretsPage(req: Request, res: Response) {
  /**
   * isAuthenticated is added by passport middleware.
   * It will be true if there is and auth object exists after deserializing the request user.
   */
  if (req.isAuthenticated()) {
    const user: SessionUser = req.user;
    const secret = await getSecret(user.id as string);

    console.log('I am in getSecretsPage controller', user, secret);

    if (secret) {
      res.render('secrets.ejs', { secret, name: user.email });
    } else {
      res.render('secrets.ejs', {
        secret: "You don't have any secrets yet. Go ahead and add one 🤫",
        name: user.email,
      });
    }
  } else {
    res.redirect('/auth');
  }
}

export async function addNewSecret(req: Request, res: Response) {
  if (req.isAuthenticated()) {
    const user: SessionUser = req.user;
    const secret: string = req.body.secret;

    await addSecret(user.id as string, secret);

    res.render('secrets.ejs', {
      secret,
      name: user.email,
    });
  } else {
    res.redirect('/auth');
  }
}
