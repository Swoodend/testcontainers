import { Client, QueryResultRow } from 'pg';
import { IUserRepository } from '../domain-models/IUserRepository.js';
import { User } from '../domain-models/user.js';
import { camelCaseObjectProperties } from '../utils/snakeCaseToCamelCase.js';
import { NewUser } from '../domain-models/newUser.js';

export class UserRepository implements IUserRepository {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async addUser(user: NewUser): Promise<number> {
    const sql =
      'INSERT INTO users (first_name, last_name, email) VALUES($1, $2, $3)';
    const result = await this.client.query(sql, [
      user.firstName,
      user.lastName,
      user.email,
    ]);

    if (result.rowCount !== 1) {
      throw new Error('addUser returned more than 1 row after insert');
    }

    return result.rowCount;
  }

  async fetchUserByEmail(email: string): Promise<User | null> {
    const sql = 'SELECT * from users WHERE email = $1';
    const result = await this.client.query(sql, [email]);
    return result.rows.length
      ? this.rawSqlResponseToUserModel(result.rows)[0]
      : null;
  }

  async fetchUserById(id: number): Promise<User | null> {
    const sql = 'SELECT * from users WHERE id = $1';
    const result = await this.client.query(sql, [id]);
    return result.rows.length
      ? this.rawSqlResponseToUserModel(result.rows)[0]
      : null;
  }

  async getUsers(): Promise<User[] | null> {
    const result = await this.client.query('SELECT * from USERS');
    return result.rows.length
      ? this.rawSqlResponseToUserModel(result.rows)
      : null;
  }

  private rawSqlResponseToUserModel = (rows: QueryResultRow[]): User[] => {
    return rows.map((row) => {
      const user = camelCaseObjectProperties(row);
      return new User(user.id, user.firstName, user.lastName, user.email);
    });
  };
}
