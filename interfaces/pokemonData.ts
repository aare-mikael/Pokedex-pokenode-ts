// Contains data-mapping for pokeApi used in this project

export interface NamedObject {
  id: number;
  name: string;
}

export interface Abilities {
  ability: Ability;
}

export interface Ability {
  name: string;
}

export interface Sprites {
  front_default: string;
}

export interface Stats {
  stat: Stat;
  base_stat: number;
}

export interface Stat {
  name: string;
}

export interface Type {
  id: number;
  name: string;
}

export interface Types {
  slot: number;
  type: Type;
}

export interface PokemonData {
  abilities: Abilities[];
  base_experience: number;
  height: number;
  id: number;
  name: string;
  sprites: Sprites;
  stats: Stats[];
  types: Types[];
  weight: number;
}
