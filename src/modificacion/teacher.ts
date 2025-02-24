
import { Person } from "./person";



/**
 * Represents a Teacher
 *
 * This class initializes a Teacher with its information.
 *
 * Class Teacher
 */
export class Teacher extends Person {
  private _email: string;
  private _officeNumber: number;
  private _officeAddress: string;

  /**
   * Construct an object of the Teacher class
   * @param name - name of the teacher
   * @param surname - surname of the teacher
   * @param birthday - birthday of the teacher
   * @param address - address of the teacher
   * @param phoneNumber - phone number of the teacher
   * @param email - email of of the teacher
   * @param officeNumber - office number of the teacher
   * @param officeAddress - office address of the teacher
   */
  constructor(
    name: string,
    surname: string,
    birthday: string,
    address: string,
    phoneNumber: number,
    email: string,
    officeNumber: number,
    officeAddress: string,
  ) {
    super(name, surname, birthday, address, phoneNumber);
    this._email = email;
    this._officeNumber = officeNumber;
    this._officeAddress = officeAddress;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(officeNumber: number) {
    this._officeNumber = officeNumber;
  }

  get officeAddress() {
    return this._officeAddress;
  }

  set officeAddress(officeAddress: string) {
    this._officeAddress = officeAddress;
  }


  /**
   * Method that returns the info of a teacher
   * @returns a string with the information of the teacher
   */
  showInfo(): string {
    let info: string = "";
    info += "Profesor\n";
    info += "Nombre: " + this.name + "\n";
    info += "Apellido: " + this.surname + "\n";
    info += "Fecha de nacimiento: " + this.birthday + "\n";
    info += "Direccion: " + this.address + "\n";
    info += "Numero de telefono: " + this.phoneNumber.toString() + "\n";
    info += "Email: " + this.email + "\n";
    info += "Numero de despacho: " + this.officeNumber.toString() + "\n";
    info += "Direccion despacho: " + this.officeAddress + "\n";
    return info;
  }
}
