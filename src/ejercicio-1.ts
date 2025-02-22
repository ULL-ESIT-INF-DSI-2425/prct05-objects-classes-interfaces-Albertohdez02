export enum Type {
  //NORMAL,
  FIRE,
  WATER,
  GRASS,
  ELECTRIC,
  // ICE,
  // FIGHTING,
  // POISON,
  // GROUND,
  // FLYING,
  // PSYCHIC,
  // BUG,
  // ROCK,
  // GHOST,
  // DRAGON,
  // DARK,
  // STEEL,
  // FAIRY,
}

export interface PokemonInfo {
  name: string;
  height: number;
  weight: number;
  type: Type;
  statistics: {
    hp: number;
    attack: number;
    defense: number;
    speedAttack: number;
    speedDefense: number;
    speed: number;
  };
}

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

/**
 * Represents a Combat between two Pokemons.
 *
 * This class provides functionality to start for a simulation of a combat between two Pokemons based on their attributes.
 *
 * Class Combat
 */
export class Combat {
  private competitors: Combatants;

  /**
   * Constructor of the class Combat that instances the two Pokemon combatants
   * @param combatant1 - first Pokemon of the combat to attack
   * @param combatant2 - second Pokemon of the combat to attack
   */
  constructor(
    public readonly combatant1: Pokemon,
    public readonly combatant2: Pokemon,
  ) {
    this.competitors = [combatant1, combatant2];
  }

  /**
   * Method that starts and emulates the combat between 2 Pokemons
   * @returns the winner Pokemon
   */
  public start(): Pokemon {
    let [attacker, defender] = this.competitors;

    console.log(`🔥 Combat starts: ${attacker.name} VS ${defender.name}! 🔥`);

    while (attacker.statistics.hp > 0 && defender.statistics.hp > 0) {
      const damage = this.calculateDamage(attacker, defender);
      defender.statistics.hp -= damage;
      if (defender.statistics.hp < 0) defender.statistics.hp = 0;

      console.log(
        `⚔️ ${attacker.name} attacks ${defender.name}! Damage: ${damage.toFixed(2)}`,
      );
      console.log(
        `❤️ ${defender.name} HP left: ${defender.statistics.hp.toFixed(2)}`,
      );

      if (defender.statistics.hp === 0) {
        console.log(`🏆 ${attacker.name} wins the battle!`);
        break;
      }

      // swap attacker and defender
      [attacker, defender] = [defender, attacker];
    }
    return attacker;
  }

  /**
   * Calculates the damage inflicted by the attacker on the defender.
   * @param attacker - The attacking Pokemon.
   * @param defender - The defending Pokemon.
   * @returns The damage inflicted.
   */
  private calculateDamage(attacker: Pokemon, defender: Pokemon): number {
    const attack = attacker.statistics.attack;
    const defense = defender.statistics.defense;
    const effectiveness = this.getEffectiveness(attacker.type, defender.type);

    return 50 * (attack / defense) * effectiveness;
  }

  /**
   * Determines the effectiveness multiplier based on type matchups.
   * @param attackerType - The type of the attacking Pokemon.
   * @param defenderType - The type of the defending Pokemon.
   * @returns The effectiveness multiplier (2, 1, or 0.5).
   */
  private getEffectiveness(attackerType: Type, defenderType: Type): number {
    const typeChart: Record<Type, Record<number, number>> = {
      [Type.FIRE]: { [Type.GRASS]: 2, [Type.WATER]: 0.5, [Type.ELECTRIC]: 1 },
      [Type.WATER]: { [Type.GRASS]: 0.5, [Type.ELECTRIC]: 0.5, [Type.FIRE]: 2 },
      [Type.GRASS]: { [Type.WATER]: 2, [Type.ELECTRIC]: 1, [Type.FIRE]: 0.5 },
      [Type.ELECTRIC]: { [Type.WATER]: 2, [Type.GRASS]: 1, [Type.FIRE]: 1 },
    };

    return typeChart[attackerType]?.[defenderType] ?? 1;
  }
}
