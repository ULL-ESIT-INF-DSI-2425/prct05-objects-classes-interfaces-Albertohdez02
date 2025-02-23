import { Pokemon, Combatants } from "./pokemon";
import { Type } from "./types";

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
