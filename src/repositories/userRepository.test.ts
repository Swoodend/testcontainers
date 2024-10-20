import { Client } from 'pg';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { UserRepository } from './userRepository.js';
import { createUserTable } from '../test-utils/createUserTable.js';
import { NewUser } from '../domain-models/newUser.js';

describe('userRepository', () => {
  jest.setTimeout(60000);
  let postgresContainer: StartedPostgreSqlContainer;
  let postgresClient: Client;
  let repo: UserRepository;
  let userJoe: NewUser;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    postgresClient = new Client({
      connectionString: postgresContainer.getConnectionUri(),
    });
    await postgresClient.connect();
    repo = new UserRepository(postgresClient);
    userJoe = new NewUser('Joe', 'Smith', 'jsmith@gmail.com');
  });

  beforeEach(async () => {
    await createUserTable(postgresClient);
  });

  afterEach(async () => {
    await postgresClient.query('DROP TABLE IF EXISTS users');
  });

  afterAll(async () => {
    await postgresClient.end();
    await postgresContainer.stop();
  });

  it('should add a user', async () => {
    const newUser = await repo.addUser(userJoe);
    expect(newUser).toBe(1);
  });

  it('should find all users', async () => {
    await repo.addUser(userJoe);
    const users = await repo.getUsers();

    if (users === null) {
      throw new Error('expected to find user, but no users were found');
    }

    expect(users.length).toBe(1);
    expect(users[0].firstName).toBe(userJoe.firstName);
    expect(users[0].lastName).toBe(userJoe.lastName);
    expect(users[0].email).toBe(userJoe.email);
  });

  it('should find a user by email', async () => {
    await repo.addUser(userJoe);
    const user = await repo.fetchUserByEmail(userJoe.email);

    if (user === null) {
      throw new Error(
        'expected to find user by email, but no users were found',
      );
    }

    expect(user).toBeTruthy();
    expect(user.firstName).toBe(userJoe.firstName);
    expect(user.lastName).toBe(userJoe.lastName);
    expect(user.email).toBe(userJoe.email);
  });

  it('should return null if cannot find user by email', async () => {
    const user = await repo.fetchUserByEmail(userJoe.email);
    expect(user).toBeNull;
  });

  it('should fetch user by id', async () => {
    await repo.addUser(userJoe);
    // auto incrementing key and joe is the first add to the users table
    const joe = await repo.fetchUserById(1);

    if (joe === null) {
      throw new Error('expected to find user by id, but no users were found');
    }

    expect(joe.id).toBe(1);
  });

  it('should return null if cannot find user by id', async () => {
    // doesnt exist in users table
    const user = await repo.fetchUserById(1);
    expect(user).toBeNull;

    await repo.addUser(userJoe);
    // bad id - joe user exists with id 1, 2 should match nothing
    const joe = await repo.fetchUserById(2);
    expect(joe).toBeNull;
  });
});
