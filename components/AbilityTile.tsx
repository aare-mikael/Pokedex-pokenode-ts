import React, { useState, useEffect } from 'react';
import { fetchAbilityByName } from '../api/fetchAbilityByName';
import { Ability } from 'pokenode-ts';
import styles from './AbilityTile.module.css';

interface AbilityTileProps {
  name: string;
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const AbilityTile = ({ name }: AbilityTileProps) => {
  const [ability, setAbility] = useState<Ability>();

  useEffect(() => {
    async function fetchData(name: string) {
      try {
        const fetchedAbility = await fetchAbilityByName(name);
        setAbility(fetchedAbility);
      } catch (error) {
        console.error('Error fetching Ability', error);
        throw error;
      }
    }
    fetchData(name);
  }, [name]);

  if (!ability) {
    return <p>Loading...</p>;
  }

  const pokemonWithAbilitySorted = [...ability.pokemon].sort((a, b) =>
    a.pokemon.name.localeCompare(b.pokemon.name)
  );
  const pokemonsWithAbility = pokemonWithAbilitySorted.map((x, i) => {
    return (
      <span key={i}>
        {capitalize(x.pokemon.name)}
        {i == ability.pokemon.length - 1 ? '' : ' | '}
      </span>
    );
  });

  return (
    <div className={styles.abilityTile}>
      {ability ? (
        <>
          {
            <div className={styles.abilityTileContent}>
              <div className={styles.abilityTileName}>
                <h1>{capitalize(ability.name)}</h1>
              </div>
              <div className={styles.abilityTileContainer}>
                <div className={styles.abilityTileInformation}>
                  <span>
                    Pokemon who may learn {capitalize(ability.name)}:
                    <br />
                    {pokemonsWithAbility}
                  </span>
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

export default AbilityTile;
