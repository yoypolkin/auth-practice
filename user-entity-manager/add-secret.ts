import pool from './db.js';

export async function addSecret(id: string, secret: string): Promise<void> {
  const connection = await pool.connect();

  try {
    await connection.query('UPDATE users SET secret = $1 WHERE users.id = $2', [
      secret,
      id,
    ]);
  } catch (error) {
    throw new Error('Error adding a secret: ' + error);
  } finally {
    connection.release();
  }
}
