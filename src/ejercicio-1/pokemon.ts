import { Type, PokemonInfo } from "./types";

export type Combatants = [Pokemon, Pokemon];

/**
 * Represents a Pokemon
 *
 * This class provides initializes a Pokemon with its information.
 *
 * Class Pokemon
 */
export class Pokemon implements PokemonInfo {
  /**
   * Constructor of the class Pokemon that creates a Pokemon object
   * @param name - a string with the name of the Pokemon
   * @param height - a number with the height in meters of the Pokemon
   * @param weight - a number with the weight in kilograms of the Pokemon
   * @param type - a enum Type data with the type of the Pokemon
   * @param statistics - an object with values for each stat of the Pokemon
   */
  constructor(
    public readonly name: string,
    public readonly height: number,
    public readonly weight: number,
    public readonly type: Type,
    public readonly statistics: {
      hp: number;
      attack: number;
      defense: number;
      speedAttack: number;
      speedDefense: number;
      speed: number;
    },
  ) {}
}