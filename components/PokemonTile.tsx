import React from 'react';
import { useEffect, useState } from 'react';
import { fetchPokemonByName } from '../api/fetchPokemonByName';
import { Pokemon } from 'pokenode-ts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PokemonTileProps {
  name: string;
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const PokemonTile = ({ name }: PokemonTileProps) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const router = useRouter();

  // TODO; First present a small tile with basic info,
  // then on click, present a larger tile with more info
  // const handleTileClick = () => {
  //   const path = `/pokemon/${name}`;
  //   router.push(path);
  // };

  useEffect(() => {
    async function fetchData(name: string) {
      console.log('Fetching Pokemon', name);
      try {
        const fetchedPokemon = await fetchPokemonByName(name);
        setPokemon(fetchedPokemon);
      } catch (error) {
        console.error('Error fetching Pokemon', error);
        throw error;
      }
    }
    fetchData(name);
  }, [name]);

  const abilities = pokemon.abilities.map((x, i) => {
    return (
      <span key={i}>
        {capitalize(x.ability.name)}
        {i == pokemon.abilities.length - 1 ? '' : ', '}
      </span>
    );
  });

  const stats = pokemon.stats.map((x, i) => {
    return (
      <span key={i}>
        {capitalize(x.stat.name)}: {x.base_stat}
        {i == pokemon.stats.length - 1 ? '' : ', '}
      </span>
    );
  });

  const types = pokemon.types.map((x, i) => {
    return (
      <span key={i}>
        {capitalize(x.type.name)}
        {i == pokemon.types.length - 1 ? '' : ', '}
      </span>
    );
  });

  return (
    <div className={'pokemon-tile'}>
      <div className="pokemon-tile-content">
        <div className="pokemon-tile-name">
          <h1>{capitalize(pokemon.name)}</h1>
        </div>
        <div className="pokemon-tile-container">
          <div className="pokemon-tile-image">
            <Image src={pokemon.sprites.front_default} alt="pokemon" />
          </div>
          <div className="pokemon-tile-information">
            <span>Abilities: {abilities}</span>
            <p>Base experience: {pokemon.base_experience}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>ID: {pokemon.id}</p>
            <p>Stats: </p>
            <span>{stats}</span>
            <p>Types: {types}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonTile;
