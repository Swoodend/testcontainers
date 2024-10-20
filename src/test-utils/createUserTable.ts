import { Client } from 'pg';

export const createUserTable = async (client: Client) => {
  const query =
    'CREATE TABLE IF NOT EXISTS users (' +
    'id SERIAL NOT NULL, ' +
    'first_name VARCHAR NOT NULL, ' +
    'last_name VARCHAR NOT NULL, ' +
    'email VARCHAR UNIQUE NOT NULL, ' +
    'PRIMARY KEY (id))';
  await client.query(query);
};
