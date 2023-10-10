import styles from './[type].module.css';
import { fetchPokemonNames } from '@/api/fetchPokemonNames';
import PokemonTile from '@/components/PokemonTile';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { fetchPokemonByName } from '@/api/fetchPokemonByName';
import { Pokemon } from 'pokenode-ts';

const TypePage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [sortMethod, setSortMethod] = useState('id');
  const router = useRouter();
  const { type: chosenType } = router.query;

  const sortedPokemon = [...pokemon].sort((a, b) => {
    switch (sortMethod) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'name-reverse':
        return b.name.localeCompare(a.name);
      case 'id-reverse':
        return pokemon.indexOf(b) - pokemon.indexOf(a);
      default:
        return pokemon.indexOf(a) - pokemon.indexOf(b);
    }
  });

  useEffect(() => {
    async function fetchData() {
      if (!chosenType) return;

      try {
        const fetchedPokemonNames = await fetchPokemonNames();
        console.log('Fetched names! ', fetchedPokemonNames);
        let allPokemonArray: Pokemon[] = [];
        for (let i = 0; i < fetchedPokemonNames.length; i++) {
          console.log('Fetching Pokemon number', i);
          const pokemon: Pokemon = await fetchPokemonByName(
            fetchedPokemonNames[i].name
          );
          allPokemonArray.push(pokemon);
        }
        console.log('Pushed to allPokemonArray');
        const filteredPokemon = allPokemonArray.filter((x) => {
          x.types.some((y) => y.type.name === chosenType);
        });
        console.log('Filtered allPokemonArray');
        setPokemon(filteredPokemon);
      } catch (error) {
        console.error('Error fetching Pokemon', error);
        throw error;
      }
    }
    fetchData();
  }, [chosenType]);

  return (
    <div className={styles.background}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.homebutton}>
            <Link href="/">
              <Image
                src="/Pokeball.svg"
                alt="Pokeball"
                width={75}
                height={75}
              />
            </Link>
          </div>
          <br />
          <div className={styles.button}>
            <button onClick={() => setSortMethod('name')}>
              Sort by Name A-Z
            </button>
            <button onClick={() => setSortMethod('name-reverse')}>
              Sort by Name Z-A
            </button>
            <button onClick={() => setSortMethod('id')}>Sort by ID 0-20</button>
            <button onClick={() => setSortMethod('id-reverse')}>
              Sort by ID 20-0
            </button>
          </div>
        </div>
        <div className={styles.grid}>
          {pokemon.map((x, i) => {
            return <PokemonTile key={i} name={x.name} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TypePage;
