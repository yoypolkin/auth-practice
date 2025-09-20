import pool from './db.js';
import { AppUser } from '../types/user.js';

export async function findUserByEmail(email: string): Promise<AppUser | null> {
  const connection = await pool.connect();

  try {
    console.log('Finding user by email...');
    const result = await connection.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) return null;

    return result.rows[0] as AppUser;
  } catch (error) {
    throw new Error('Error finding user by email: ' + email);
  } finally {
    connection.release();
  }
}
