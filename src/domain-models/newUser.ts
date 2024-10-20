export class NewUser {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
