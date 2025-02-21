import { describe, test, expect } from "vitest"
import { add } from "../src/ejercicio-1"

describe("function add(complexNum1, complexNum2) tests", () => {
  test("add()", () => {
    expect(add(1, 2, 3)).toEqual(6);
  });

});