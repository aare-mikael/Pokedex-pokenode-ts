import Layout from '@/components/Layout';
import Image from 'next/image';

function Home() {
  return <Layout>‎</Layout>; // Empty unicode character to prevent error
}

export default Home;

// import React, { useState, useEffect } from 'react';
// import styles from './index.module.css';
// import Image from 'next/image';
// import PokemonLogo from '../public/PokemonLogo.png';
// import fetchTypes from '../api/fetchTypes';
// import TypeTile from '@/components/TypeTile';

// function Logo() {
//   return (
//     <div className="logo">
//       <Image
//         src={PokemonLogo}
//         alt="Pokemon Logo"
//         width={820}
//         height={450}
//         priority
//       />
//     </div>
//   );
// }

// interface GridH2Props {
//   link: string;
//   head: string;
//   desc: string;
// }

// export function GridH2({ link, head, desc }: GridH2Props) {
//   return (
//     <a
//       href={link}
//       className={styles.footer}
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <h2>
//         {head} <span>-&gt;</span>
//       </h2>
//       <p>{desc}</p>
//     </a>
//   );
// }

// function Home() {
//   const [types, setTypes] = useState([]);
//   const [sortMethod, setSortMethod] = useState('id');

//   const sortedTypes = [...types].sort((a, b) => {
//     switch (sortMethod) {
//       case 'name':
//         return a.name.localeCompare(b.name);
//       case 'name-reverse':
//         return b.name.localeCompare(a.name);
//       case 'id-reverse':
//         return types.indexOf(b) - types.indexOf(a);
//       default:
//         return types.indexOf(a) - types.indexOf(b);
//     }
//   });

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const fetchedTypes = await fetchTypes();
//         const mappedTypes = fetchedTypes.map((type) => ({
//           url: type.url,
//           name: type.name,
//         }));
//         setTypes(mappedTypes);
//       } catch (error) {
//         console.error('Error fetching types', error);
//         throw error;
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className={styles.background}>
//       <main className={styles.main}>
//         {/* <Logo /> */}
//         <div className={styles.container}>
//           <div className={styles.header}>
//             <div className={styles.button}>
//               <button onClick={() => setSortMethod('name')}>
//                 Sort by Name A-Z
//               </button>
//               <button onClick={() => setSortMethod('name-reverse')}>
//                 Sort by Name Z-A
//               </button>
//               <button onClick={() => setSortMethod('id')}>
//                 Sort by ID 0-20
//               </button>
//               <button onClick={() => setSortMethod('id-reverse')}>
//                 Sort by ID 20-0
//               </button>
//             </div>
//           </div>
//           <div className={styles.grid}>
//             {sortedTypes.map((x, i) => {
//               return <TypeTile key={i} name={x.name} />;
//             })}
//           </div>
//         </div>

//         <footer className={styles.footer}>
//           <div className={styles.footergrid}>
//             <GridH2
//               link="https://www.linkedin.com/in/mikaelaare/"
//               head="LinkedIn"
//               desc="Find me on LinkedIn"
//             />
//             <GridH2
//               link="https://github.com/aare-mikael/Pokedex-pokenode-ts"
//               head="Github repository"
//               desc="Explore the github repository for this project"
//             />
//             <GridH2
//               link="https://pokenode-ts.vercel.app/"
//               head="Wrapper"
//               desc="The wrapper used for this project"
//             />
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// }

// export default Home;
