import React, { useEffect, useState } from 'react';
import { fetchPokemonByName } from '../api/fetchPokemonByName';
import { Pokemon } from 'pokenode-ts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './PokemonTile.module.css';

interface PokemonTileProps {
  name: string;
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const PokemonTile = ({ name }: PokemonTileProps) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData(name: string) {
      try {
        const fetchedPokemon = await fetchPokemonByName(name);
        if (!fetchedPokemon) {
          setError('Pokemon not found!');
        } else {
          setPokemon(fetchedPokemon);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching Pokemon', error);
        setError('An error occured while fetching the Pokemon');
      }
    }
    fetchData(name);
  }, [name]);

  const abilities = pokemon
    ? pokemon.abilities.map((x, i) => {
        return (
          <span key={i}>
            {capitalize(x.ability.name)}
            {i == pokemon.abilities.length - 1 ? '' : ', '}
          </span>
        );
      })
    : [];

  const stats = pokemon
    ? pokemon.stats.map((x, i) => {
        return (
          <span key={i}>
            {capitalize(x.stat.name)}: {x.base_stat}
            {i == pokemon.stats.length - 1 ? '' : <br />}
          </span>
        );
      })
    : [];

  const types = pokemon
    ? pokemon.types.map((x, i) => {
        let typeName = capitalize(x.type.name);
        return (
          <span key={i}>
            <Image
              src={`/types/${typeName}.png`}
              alt={x.type.name}
              width={75}
              height={30}
            />
          </span>
        );
      })
    : [];

  return (
    <div className={styles.pokemonTile}>
      {error ? (
        <p>{error}</p>
      ) : pokemon ? (
        <>
          {
            <div className={styles.pokemonTileContent}>
              <div className={styles.pokemonTileName}>
                <h1>{capitalize(pokemon.name)}</h1>
              </div>
              <div className={styles.pokemonTileContainer}>
                <div className={styles.pokemonTileImage}>
                  <Image
                    src={pokemon.sprites.front_default}
                    alt="pokemon"
                    width={200}
                    height={200}
                  />
                </div>
                <div className={styles.pokemonTileInformation}>
                  <span>Abilities: {abilities}</span>
                  <p>Base experience: {pokemon.base_experience}</p>
                  <p>Height: {pokemon.height}</p>
                  <p>Weight: {pokemon.weight}</p>
                  <p>ID: {pokemon.id}</p>
                  <p>{stats}</p>
                  <p>Types: {types}</p>
                </div>
              </div>
            </div>
          }
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonTile;
