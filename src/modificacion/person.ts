/**
 * Abstract class that implements a Person
 * 
 * Class Person 
 */

export abstract class Person {
  private _name: string;
  private _surname: string;
  private _birthday: string;
  private _address: string;
  private _phoneNumber: number;
  constructor(
    name: string,
    surname: string,
    birthday: string,
    address: string,
    phoneNumber: number,
  ) {
    this._name = name;
    this._surname = surname;
    this._birthday = birthday;
    this._address = address;
    this._phoneNumber = phoneNumber;
  }

  /**
   * Get the name of a Person
   */
  get name() {
    return this._name;
  }

  /**
   * Set the name of the Person
   * @param name - name of the Person
   */
  set name(name: string) {
    this._name = name;
  }

  get surname() {
    return this._surname;
  }

  set surnamename(surname: string) {
    this._surname = surname;
  }

  get birthday() {
    return this._birthday;
  }

  set birthday(birthday: string) {
    this._birthday = birthday;
  }

  get address() {
    return this._address;
  }

  set address(address: string) {
    this._address = address;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  set phoneNumber(phoneNumber: number) {
    this._phoneNumber = phoneNumber;
  }

  public abstract showInfo(): string;
}
