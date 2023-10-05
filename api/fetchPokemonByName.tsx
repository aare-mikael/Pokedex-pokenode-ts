// import { PokemonData } from '../interfaces/pokemonData';
// import { client } from './api';
// import { gql } from '@apollo/client';

// const queryPokemonByName = gql`
//   query getOnePokemon($name: String!) {
//     pokemon(name: $name) {
//       abilities {
//         ability {
//           name
//         }
//       }
//       base_experience
//       game_indices {
//         version {
//           name
//         }
//       }
//       height
//       id
//       name
//       sprites {
//         front_default
//       }
//       stats {
//         stat {
//           name
//         }
//         base_stat
//       }
//       types {
//         slot
//         type {
//           name
//         }
//       }
//       weight
//     }
//   }
// `;

// export async function fetchPokemonByName(name: String): Promise<PokemonData> {
//   try {
//     const { data } = await client.query({
//       query: queryPokemonByName,
//       variables: { name },
//     });
//     return data.pokemon;
//   } catch (error) {
//     console.error('Error fetching Pokemon by name:', error);
//     throw error;
//   }
// }
