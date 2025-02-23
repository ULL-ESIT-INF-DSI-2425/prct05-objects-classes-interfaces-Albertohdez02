import { Pokemon } from "./pokemon";
import { Type, PokemonInfo } from "./types";

/**
 * Represents a Pokedex to store and search Pokémon.
 *
 * This class provides functionality to add, list, and search for Pokémon based on their attributes.
 *
 * Class Pokedex
 */
export class Pokedex {
  private dataBase: Pokemon[];

  /**
   * Constructor of the class Pokedex that initializes a Pokedex object
   * @param data - an array with Pokemon
   */
  constructor(public readonly data: Pokemon[]) {
    this.dataBase = data;
  }

  /**
   * Method that adds a Pokemon to the Pokedex data base
   * @param pokemon - an object of the class Pokemon to be added to the Pokedex
   */
  public addPokemon(pokemon: Pokemon) {
    this.dataBase.push(pokemon);
  }

  /**
   * Method that prints the information of a given Pokemon
   * @param pokemon - a Pokemon object to print his info
   */
  public printPokemonInfo(pokemon: Pokemon): void {
    console.log(
      "\tID: " + this.dataBase.indexOf(pokemon).toString().padStart(4, "0"),
    );
    console.table({
      name: pokemon.name.toUpperCase(),
      height: pokemon.height.toString() + " m",
      weight: pokemon.weight.toString() + " kg",
      type: Type[pokemon.type],
    });
    console.log("\t STATS");
    console.table(pokemon.statistics);
    console.log("-------------------------");
  }

  /**
   * Searches for Pokémon based on given criteria.
   * @param criteria - A `Partial<PokemonInfo>` object specifying search filters.
   * @returns An array of Pokémon that match the criteria.
   * @example
   * ```typescript
   * // Search by type
   * pokedex.search(\{ type: Type.FIRE \});
   * ```
   * @example
   * ```typescript
   * // Search by multiple statistics
   * pokedex.search(\{ statistics: \{ attack: 50, speed: 60 \} \});
   * ```
   */
  public search(
    criteria: Partial<Omit<PokemonInfo, "statistics">> & {
      statistics?: Partial<PokemonInfo["statistics"]>;
    },
  ): Pokemon[] {
    const results = this.dataBase.filter((pokemon) => {
      return Object.entries(criteria).every(([key, value]) => {
        if (key === "statistics" && typeof value === "object") {
          return Object.entries(value).every(([statKey, statValue]) => {
            return (
              pokemon.statistics[statKey as keyof PokemonInfo["statistics"]] ===
              statValue
            );
          });
        } else {
          return pokemon[key as keyof PokemonInfo] === value;
        }
      });
    });

    if (results.length === 0) {
      console.log("No Pokémon found matching the criteria.");
      return [];
    }

    console.log(`Found ${results.length} Pokémon(s) matching the criteria:`);
    results.forEach((pokemon) => this.printPokemonInfo(pokemon));
    return results;
  }
}