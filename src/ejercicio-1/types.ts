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
