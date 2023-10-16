import { api } from './api';

async function fetchTypes() {
  try {
    return (await api.pokemon.listTypes()).results;
  } catch (error) {
    console.error('Error fetching types', error);
    throw error;
  }
}

export default fetchTypes;
