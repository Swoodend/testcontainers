import { NewUser } from './newUser.js';

describe('user', () => {
  it('should init', () => {
    const user = new NewUser('alice', 'armstrong', 'aa@gmail.com');
    expect(user.firstName).toBe('alice');
    expect(user.lastName).toBe('armstrong');
    expect(user.email).toBe('aa@gmail.com');
  });
});
