import { AppUser } from './user.ts';

declare global {
  namespace Express {
    interface User extends AppUser {}
  }
}
