import { api } from './api';

async function fetchTypeNames() {
  try {
    return (await api.pokemon.listTypes()).results;
  } catch (error) {
    console.error('Error fetching types', error);
    throw error;
  }
}

export default fetchTypeNames;
