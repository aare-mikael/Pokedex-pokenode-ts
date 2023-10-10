// Contains data-mapping for pokeApi used in this project

export interface NamedObject {
  id: number;
  name: string;
}

export interface Abilities {
  ability: Ability;
}

export interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  effect: Effect;
}

export interface Effect {
  effect: string;
}

export interface otherPokemon {
  pokemonNames: string[];
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

export interface TypeData {
  id: number;
  name: string;
  damage_relations: NamedObject[];
}

export interface Types {
  slot: number;
  type: Type;
}

export interface PokemonData {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Abilities[];
  sprites: Sprites;
  stats: Stats[];
  types: Types[];
}
