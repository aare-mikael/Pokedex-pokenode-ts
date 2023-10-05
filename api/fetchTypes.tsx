// import { NamedObject } from '@/interfaces/pokemonData';
// import { client } from './api';
// import { gql } from '@apollo/client';

// const TYPES = gql`
//   query {
//     types {
//       results {
//         id
//         name
//       }
//     }
//   }
// `;

// export async function fetchTypes(): Promise<NamedObject[]> {
//   try {
//     const { data } = await client.query({ query: TYPES });
//     return data.types.results;
//   } catch (error) {
//     console.error('Error fetching types', error);
//     throw error;
//   }
// }
