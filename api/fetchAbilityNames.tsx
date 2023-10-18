import { api } from './api';

async function fetchAbilityNames() {
  try {
    return (await api.pokemon.listAbilities()).results;
  } catch (error) {
    console.error('Error fetching Abilities', error);
    throw error;
  }
}

export default fetchAbilityNames;
