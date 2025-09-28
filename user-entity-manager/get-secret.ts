import pool from './db.js';

export async function getSecret(id: string): Promise<string | null> {
  const connection = await pool.connect();

  try {
    const result = await connection.query(
      'SELECT secret FROM users WHERE users.id = ($1)',
      [id]
    );

    return result.rows[0].secret;
  } catch (error) {
    throw new Error('Error finding a secret: ' + error);
  } finally {
    connection.release();
  }
}
