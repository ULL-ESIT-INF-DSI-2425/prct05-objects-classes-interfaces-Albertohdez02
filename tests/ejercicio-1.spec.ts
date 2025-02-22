import { describe, expect, test } from "vitest";
import { Type, Pokemon, Pokedex, Combatants, Combat } from "../src/ejercicio-1";

const pikachu = new Pokemon("Pikachu", 0.4, 6, Type.ELECTRIC, {
  hp: 35,
  attack: 55,
  defense: 40,
  speedAttack: 50,
  speedDefense: 50,
  speed: 90,
});

const charmander = new Pokemon("Charmander", 0.6, 8.5, Type.FIRE, {
  hp: 39,
  attack: 52,
  defense: 43,
  speedAttack: 60,
  speedDefense: 50,
  speed: 65,
});

const bulbasaur = new Pokemon("Bulbasaur", 0.7, 6.9, Type.GRASS, {
  hp: 45,
  attack: 49,
  defense: 49,
  speedAttack: 65,
  speedDefense: 65,
  speed: 45,
});

const pokedex = new Pokedex([pikachu, charmander]);

const combat1 = new Combat(pikachu, charmander);

describe("Pokedex search function tests", () => {

  test("Add a new pokemon", () => {
    pokedex.addPokemon(bulbasaur);
    expect(pokedex.data.length).toBe(3);
  });

  test("Search by exact name", () => {
    const result = pokedex.search({ name: "Pikachu" });
    expect(result[0].name).toBe("Pikachu");
  });

  test("Search by type (FIRE)", () => {
    const result = pokedex.search({ type: Type.FIRE });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Charmander");
  });

  test("Search by HP (should find Bulbasaur)", () => {
    const result = pokedex.search({ statistics: { hp: 45 } });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Bulbasaur");
  });

  test("Search by speed (should find Pikachu)", () => {
    const result = pokedex.search({ statistics: { speed: 90 } });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Pikachu");
  });

  test("Search by multiple criteria (Fire type with speed 65)", () => {
    const result = pokedex.search({ type: Type.FIRE, statistics: { speed: 65 } });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Charmander");
  });

  test("Search with no results", () => {
    const result = pokedex.search({ name: "Mewtwo" });
    expect(result).toHaveLength(0);
  });

  test("Search by partial statistics (attack only)", () => {
    const result = pokedex.search({ statistics: { attack: 49 } });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Bulbasaur");
  });

  test("Search by multiple statistics (HP and defense)", () => {
    const result = pokedex.search({ statistics: { hp: 39, defense: 43 } });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Charmander");
  });

  test("Search with empty criteria should return all Pokémon", () => {
    const result = pokedex.search({});
    expect(result).toHaveLength(3);
  });

  test("Search by speedDefense (should return Pikachu and Charmander)", () => {
    const result = pokedex.search({ statistics: { speedDefense: 50 } });
    expect(result).toHaveLength(2);
    expect(result.map(pokemon => pokemon.name)).toContain("Pikachu");
    expect(result.map(pokemon => pokemon.name)).toContain("Charmander");
  });
  
});

describe("Combat class tests", () => {
  const pikachu = new Pokemon("Pikachu", 0.4, 6, Type.ELECTRIC, {
    hp: 35,
    attack: 55,
    defense: 40,
    speedAttack: 50,
    speedDefense: 50,
    speed: 90,
  });

  const bulbasaur = new Pokemon("Bulbasaur", 0.7, 6.9, Type.GRASS, {
    hp: 45,
    attack: 49,
    defense: 49,
    speedAttack: 65,
    speedDefense: 65,
    speed: 45,
  });

  const charmander = new Pokemon("Charmander", 0.6, 8.5, Type.FIRE, {
    hp: 39,
    attack: 52,
    defense: 43,
    speedAttack: 60,
    speedDefense: 50,
    speed: 65,
  });

  const squirtle = new Pokemon("Squirtle", 0.5, 9.0, Type.WATER, {
    hp: 44,
    attack: 48,
    defense: 65,
    speedAttack: 50,
    speedDefense: 64,
    speed: 43,
  });

  test("Pikachu vs Bulbasaur - Pikachu should win", () => {
    const combat = new Combat(pikachu, bulbasaur);
    const winner = combat.start();
    expect(winner.name).toBe("Pikachu");
  });

  test("Charmander vs Squirtle - Squirtle should win", () => {
    const combat = new Combat(charmander, squirtle);
    const winner = combat.start();
    expect(winner.name).toBe("Squirtle");
  });

  test("Bulbasaur vs Charmander - Charmander should win", () => {
    const combat = new Combat(bulbasaur, charmander);
    const winner = combat.start();
    expect(winner.name).toBe("Bulbasaur");
  });

  test("Squirtle vs Pikachu - Pikachu should win", () => {
    const combat = new Combat(squirtle, pikachu);
    const winner = combat.start();
    expect(winner.name).toBe("Pikachu");
  });

  test("Same Pokémon against itself - Should return the first Pokémon as winner", () => {
    const combat = new Combat(pikachu, pikachu);
    const winner = combat.start();
    expect(winner.name).toBe("Pikachu");
  });
});