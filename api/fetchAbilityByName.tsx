import { api } from './api';

export async function fetchAbilityByName(name: string) {
  try {
    return await api.pokemon.getAbilityByName(name);
  } catch (error) {
    console.error('Error fetching Move', error);
    throw error;
  }
}
