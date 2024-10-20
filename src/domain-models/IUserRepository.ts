import { User } from './user.js';
import { NewUser } from './newUser.js';

export interface IUserRepository {
  addUser(user: NewUser): Promise<number>;
  fetchUserByEmail(email: string): Promise<User | null>;
  fetchUserById(id: number): Promise<User | null>;
  getUsers(): Promise<User[] | null>;
}
