// import { PokemonData } from '@/interfaces/pokemonData';
// import { fetchPokemonByName } from './fetchPokemonByName';
// import { client } from './api';
// import { gql } from '@apollo/client';

// const PokemonQuery = (lim: number) => gql`
//   query {
//     pokemons(offset: 0, limit: ${lim}) {
//       results {
//         name
//         image
//       }
//     }
//   }
// `;

// async function getPokemonNames(lim: number) {
//   try {
//     const { data } = await client.query({ query: PokemonQuery(lim) });
//     const names: String[] = [];
//     for (let index = 0; index < data.pokemons.results.length; index++) {
//       const element = data.pokemons.results[index].name;
//       names.push(element);
//     }
//     return names;
//   } catch (error) {
//     console.error('Error fetching X Pokemon', error);
//     throw error;
//   }
// }

// export async function fetchPokemon(lim: number) {
//   const names = await getPokemonNames(lim);

//   const pokemons: PokemonData[] = [];
//   for (let index = 0; index < names.length; index++) {
//     let name = names[index];
//     try {
//       let fetchedPokemon = await fetchPokemonByName(name);
//       pokemons.push(fetchedPokemon);
//     } catch (error) {
//       console.error('Error populating pokemons', error);
//       throw error;
//     }
//   }
//   return pokemons;
// }
