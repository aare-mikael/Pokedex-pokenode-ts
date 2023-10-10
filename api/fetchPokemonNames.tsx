import { api } from './api';

export async function fetchPokemonNames() {
  try {
    const count = (await api.pokemon.listPokemons()).count;
    // First number is offset, second is limit
    return (await api.pokemon.listPokemons(0, count)).results;
  } catch (error) {
    console.error('Error in fetchPokemon.tsx, error fetching Pokemon', error);
    throw error;
  }
}
