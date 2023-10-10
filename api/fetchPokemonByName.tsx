import { api } from './api';

export async function fetchPokemonByName(name: string) {
  try {
    return await api.pokemon.getPokemonByName(name);
  } catch (error) {
    console.error('Error fetching Pokemon', error);
    throw error;
  }
}
