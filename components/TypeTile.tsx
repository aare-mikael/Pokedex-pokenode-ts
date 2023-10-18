import React, { useState, useEffect } from 'react';
import { fetchTypeByName } from '../api/fetchTypeByName';
import { Type } from 'pokenode-ts';
import Image from 'next/image';
import styles from './TypeTile.module.css';
import { useRouter } from 'next/navigation';

interface TypeTileProps {
  name: string;
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const TypeTile = ({ name }: TypeTileProps) => {
  const [type, setType] = useState<Type>();
  const router = useRouter();

  useEffect(() => {
    async function fetchData(name: string) {
      try {
        const fetchedType = await fetchTypeByName(name);
        setType(fetchedType);
      } catch (error) {
        console.error('Error fetching Type', error);
        throw error;
      }
    }
    fetchData(name);
  }, [name]);

  if (!type) {
    return <p>Loading...</p>;
  }

  const damageRelations = type.damage_relations;

  const doubleDamageFrom = damageRelations.double_damage_from.map((x, i) => {
    let ddfName = capitalize(x.name);
    return (
      <span key={i}>
        <Image
          className={styles.damageImage}
          src={`/types/${ddfName}.png`}
          alt={ddfName}
          width={75}
          height={30}
        />
        {i == damageRelations.double_damage_from.length - 1 ? '' : ' | '}
      </span>
    );
  });

  const doubleDamageTo = damageRelations.double_damage_to.map((x, i) => {
    let ddtName = capitalize(x.name);
    return (
      <span key={i}>
        <Image
          className={styles.damageImage}
          src={`/types/${ddtName}.png`}
          alt={ddtName}
          width={75}
          height={30}
        />
        {i == damageRelations.double_damage_to.length - 1 ? '' : ' | '}
      </span>
    );
  });

  const halfDamageFrom = damageRelations.half_damage_from.map((x, i) => {
    let hdfName = capitalize(x.name);
    return (
      <span key={i}>
        <Image
          className={styles.damageImage}
          src={`/types/${hdfName}.png`}
          alt={hdfName}
          width={75}
          height={30}
        />
        {i == damageRelations.half_damage_from.length - 1 ? '' : ' | '}
      </span>
    );
  });

  const halfDamageTo = damageRelations.half_damage_to.map((x, i) => {
    let hdtName = capitalize(x.name);
    return (
      <span key={i}>
        <Image
          className={styles.damageImage}
          src={`/types/${hdtName}.png`}
          alt={hdtName}
          width={75}
          height={30}
        />
        {i == damageRelations.half_damage_to.length - 1 ? '' : ' | '}
      </span>
    );
  });

  const noDamageFrom = damageRelations.no_damage_from.map((x, i) => {
    let ndfName = capitalize(x.name);
    return (
      <span key={i}>
        <Image
          className={styles.damageImage}
          src={`/types/${ndfName}.png`}
          alt={ndfName}
          width={75}
          height={30}
        />
        {i == damageRelations.no_damage_from.length - 1 ? '' : ' | '}
      </span>
    );
  });

  const noDamageTo = damageRelations.no_damage_to.map((x, i) => {
    let ndtName = capitalize(x.name);
    return (
      <span key={i}>
        <Image
          className={styles.damageImage}
          src={`/types/${ndtName}.png`}
          alt={ndtName}
          width={75}
          height={30}
        />
        {i == damageRelations.no_damage_to.length - 1 ? '' : ' | '}
      </span>
    );
  });

  const movesInTypeSorted = [...type.moves].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const movesInType = movesInTypeSorted.map((x, i) => {
    return (
      <span key={i}>
        {capitalize(x.name)}
        {i == type.moves.length - 1 ? '' : ' | '}
      </span>
    );
  });

  const pokemonInTypeSorted = [...type.pokemon].sort((a, b) =>
    a.pokemon.name.localeCompare(b.pokemon.name)
  );
  const pokemonInType = pokemonInTypeSorted.map((x, i) => {
    return (
      <span key={i}>
        {capitalize(x.pokemon.name)}
        {i == type.pokemon.length - 1 ? '' : ' | '}
      </span>
    );
  });

  return (
    <div className={styles.typeTile}>
      {type ? (
        <>
          {
            <div className={styles.typeTileContent}>
              <div className={styles.typeTileName}>
                <h1>{capitalize(type.name)}</h1>
              </div>
              <div className={styles.typeTileContainer}>
                <div className={styles.typeTileInformation}>
                  <span>Double Damage from: {doubleDamageFrom}</span>
                  <br />
                  <span>Half Damage to: {halfDamageTo}</span>
                  <br />
                  <span>No Damage to: {noDamageTo}</span>
                  <br />
                  <span>Double Damage to: {doubleDamageTo}</span>
                  <br />
                  <span>Half Damage from: {halfDamageFrom}</span>
                  <br />
                  <span>No Damage from: {noDamageFrom}</span>
                  <br />
                  <span>MOVES: {movesInType}</span>
                  <br />
                  <span>POKEMON: {pokemonInType}</span>
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

export default TypeTile;
