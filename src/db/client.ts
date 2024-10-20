import pg from 'pg';
const { Client } = pg;

export const createTestDBClient = () => {
  return new Client({
    user: 'database-user',
    password: 'secretpassword!!',
    host: 'my.database-server.com',
    port: 5334,
    database: 'database-name',
  });
};
