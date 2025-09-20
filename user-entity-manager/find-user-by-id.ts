import { AppUser } from '../types/user.js';
import pool from './db.js';

export async function findUserById(id: string): Promise<AppUser | null> {
  const connection = await pool.connect();

  try {
    const result = await connection.query(
      'SELECT * FROM users WHERE users.id = $1',
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0] as AppUser;
  } catch (error) {
    throw new Error('Error finding user with id: ' + id);
  } finally {
    connection.release();
  }
}
