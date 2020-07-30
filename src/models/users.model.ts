export class UsersModel {

  public id?: number;
  public email: string;
  public firstName: string;
  public middleName? = '';
  public lastName: string;
  public phone: string;
  public isEnabled? = 1;
  public password?: string;

  constructor(data: unknown | any) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.middleName = data.middleName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.isEnabled = data.isEnabled;
    this.password = data.password;
  }

}
