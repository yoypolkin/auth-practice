import { SessionUser } from './user.ts';

declare global {
  namespace Express {
    interface User extends SessionUser {}
  }
}
