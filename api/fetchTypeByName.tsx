import { api } from './api';

export async function fetchTypeByName(name: string) {
  try {
    return await api.pokemon.getTypeByName(name);
  } catch (error) {
    console.error('Error fetching Type', error);
    throw error;
  }
}
