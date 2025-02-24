import { Student } from "./student";
import { Teacher } from "./teacher";

export type StudentEntry = [Student, number];
export type TeacherEntry = Teacher[];

/**
 * Represents a Subject
 *
 * This class initializes a Subject with its information.
 *
 * Class Subject
 */
export class Subject {
  accessor code: number;
  accessor name: string;
  accessor degree: string;
  accessor teachers: TeacherEntry;
  accessor students: StudentEntry[];

  /**
   * Construct an object of the class Subject
   * @param code -
   * @param name -
   * @param degree -
   * @param teacherEntry -
   * @param studentEntry -
   */
  constructor(code: number, name: string, degree: string, teacherEntry: TeacherEntry, studentEntry: StudentEntry[]) {
    this.code = code;
    this.name = name;
    this.degree = degree;
    this.teachers = teacherEntry;
    this.students = studentEntry;
  }

  /**
   * Method that returns the info of the teachers of a Subject
   * @returns a string with the information of the teachers of a Subject
   */
  showTeachers(): string {
    let result: string = "";
    result += "PROFESORES: ";
    let counter: number = 1;
    this.teachers.forEach(teacher =>{
      result += "Profesor " + counter.toString() + "\n";
      result += teacher.showInfo() + "\n\n";
      counter++;
    })
    return result;
  }

    /**
   * Method that returns the info of the students of a Subject
   * @returns a string with the information of the students of a Subject
   */
  showStudents(): string {
    let result: string = "";
    result += "ESTUDIANTES: ";
    let counter: number = 1;
    this.students.forEach(student => {
      result += "Estudiante " + counter.toString() + "\n";
      result += student[0].showInfo() + "\n\n";
      counter++;
    })
    return result;
  }

}