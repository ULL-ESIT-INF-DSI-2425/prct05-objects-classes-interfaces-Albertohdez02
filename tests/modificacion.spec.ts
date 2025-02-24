import { describe, expect, test } from "vitest";
import { Person } from "../src/modificacion/person";
import { Student } from "../src/modificacion/student";
import { Teacher } from "../src/modificacion/teacher";
import { Subject, TeacherEntry, StudentEntry } from "../src/modificacion/subject";


const jaime = new Student("Jaime", "Gonzalez", "14/02/2002", "Calle Castillo 4", 600100200, "jaime@ull.edu.es", 1101433000, 6.7);
const miguel = new Student("Miguel", "Duque", "23/04/2001", "Calle Castillo 7", 600990200, "miguel@ull.edu.es", 1101439990, 8.0);
const victor = new Student("Victor", "Cobendas", "14/02/2002", "Calle Castillo 9", 607700200, "victor@ull.edu.es", 1101555500, 9.1);
const aitor = new Teacher("Aitor", "Mendez", "04/07/1969", "Avenida Anaga 13", 622111300, "aitor@ull.edu.es", 922000000, "Modulo B, Planta 4");
const pedro = new Teacher("Pedro", "Luis", "12/09/1981", "Avenida Anaga 3", 622311300, "pedro@ull.edu.es", 922110000, "Modulo A, Planta 1");

const teachers: TeacherEntry = [aitor, pedro];

const students: StudentEntry[] = [[jaime, 6.7], [miguel, 8.0], [victor, 9.1]];

const dsi = new Subject(12, "Desarrollo de Sistemas Informaticos", "Informatica", teachers, students);

describe("Class Student tests", () => {
  test("Jaime es una persona y un estudiante", () => {
    expect(jaime instanceof Person).toBe(true);
    expect(jaime instanceof Student).toBe(true);
  });

  test("Jaime muestra su informacion correctamente", () => {
    let infoJaime: string = jaime.showInfo();
    console.log(infoJaime);
    expect(infoJaime).toBe("Estudiante\nNombre: Jaime\nApellido: Gonzalez\nFecha de nacimiento: 14/02/2002\nDireccion: Calle Castillo 4\nNumero de telefono: 600100200\nEmail: jaime@ull.edu.es\nID: 1101433000\nNota media: 6.7\n");
  });
  
});

describe("Class Teacher tests", () => {
  test("Aitor es una persona y un profesor", () => {
    expect(aitor instanceof Person).toBe(true);
    expect(aitor instanceof Teacher).toBe(true);
  });

  test("Aitor muestra su informacion correctamente", () => {
    let infoJaime: string = aitor.showInfo();
    console.log(infoJaime);
    expect(infoJaime).toBe("Profesor\nNombre: Aitor\nApellido: Mendez\nFecha de nacimiento: 04/07/1969\nDireccion: Avenida Anaga 13\nNumero de telefono: 622111300\nEmail: aitor@ull.edu.es\nNumero de despacho: 922000000\nDireccion despacho: Modulo B, Planta 4\n");
  });
  
});

describe("Class Subject tests", () => {
  test("Dsi es una asignatura", () => {
    expect(aitor instanceof Person).toBe(true);
    expect(aitor instanceof Teacher).toBe(true);
  });

  test("Aitor muestra su informacion correctamente", () => {
    console.log(dsi.showStudents());
  });
  
});
