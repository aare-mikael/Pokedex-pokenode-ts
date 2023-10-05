import { useState } from 'react';
import { PokemonData } from '../interfaces/pokemonData';
import { fetchPokemonByName } from '../api/fetchPokemonByName';

interface PokemonTileProps {
  name: string;
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const PokemonTile = ({ name }: PokemonTileProps) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  fetchPokemonByName(name).then((data) => setPokemon(data));

  if (!pokemon) return <div className="tile"></div>;

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
    <div className="pokemon-tile">
      <div className="pokemon-tile-content">
        <div className="pokemon-tile-name">
          <h1>{capitalize(pokemon.name)}</h1>
        </div>
        <div className="pokemon-tile-container">
          <div className="pokemon-tile-image">
            <img src={pokemon.sprites.front_default} />
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
