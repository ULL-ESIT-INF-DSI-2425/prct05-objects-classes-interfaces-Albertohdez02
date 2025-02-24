import { Person } from "./person";

/**
 * Represents a Teacher
 *
 * This class initializes a Teacher with its information.
 *
 * Class Teacher
 */
export class Student extends Person {
  private _email: string;
  private _id: number;
  private _gpa: number;

    /**
   * Construct an object of the Student class
   * @param name - name of the student
   * @param surname - surname of the student
   * @param birthday - birthday of the student
   * @param address - address of the student
   * @param phoneNumber - phone number of the student
   * @param email - email of of the student
   * @param id - id number of the student
   * @param gpa - gpa of the student
   */
  constructor(
    name: string,
    surname: string,
    birthday: string,
    address: string,
    phoneNumber: number,
    email: string,
    id: number,
    gpa: number,
  ) {
    super(name, surname, birthday, address, phoneNumber);
    this._email = email;
    this._id = id;
    this._gpa = gpa;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get id() {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get gpa() {
    return this._gpa;
  }

  set gpa(gpa: number) {
    this._gpa = gpa;
  }

  /**
   * Method that returns the info of a student
   * @returns a string with the information of the student
   */
  showInfo(): string {
    let info: string = "";
    info += "Estudiante\n";
    info += "Nombre: " + this.name + "\n";
    info += "Apellido: " + this.surname + "\n";
    info += "Fecha de nacimiento: " + this.birthday + "\n";
    info += "Direccion: " + this.address + "\n";
    info += "Numero de telefono: " + this.phoneNumber.toString() + "\n";
    info += "Email: " + this.email + "\n";
    info += "ID: " + this.id + "\n";
    info += "Nota media: " + this.gpa.toString() + "\n";
    return info;
  }
}
