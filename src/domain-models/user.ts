export class User {
  public readonly id: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;

  constructor(id: number, firstName: string, lastName: string, email: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
