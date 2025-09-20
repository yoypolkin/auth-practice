import pool from './db.js';
import { AppUser } from '../types/user.js';

export async function createUser(
  email: string,
  password: string
): Promise<AppUser> {
  const connection = await pool.connect();

  try {
    const result = await connection.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, password]
    );
    return result.rows[0] as AppUser;
  } catch (error) {
    throw new Error('Error creating a user: ' + error);
  } finally {
    connection.release();
  }
}
