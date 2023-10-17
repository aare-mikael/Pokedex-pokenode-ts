import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import Image from 'next/image';
import styles from './TypeTileDetailed.module.css';

interface TypeTileDetailedProps {
  name: string;
}

interface DamageRelations {
  doubleDamageFrom: string;
  doubleDamageTo: string;
  halfDamageFrom: string;
  halfDamageTo: string;
  noDamageFrom: string;
  noDamageTo: string;
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const TypeTileDetailed = ({ name }: TypeTileDetailedProps) => {
  //   const router = useRouter();

  // const handleTileClick = () => {
  //   const path = `/type/${name}`;
  //   router.push(path);
  // };

  const cName = capitalize(name);

  const [damageRelations, setDamageRelations] = useState<DamageRelations>({
    doubleDamageFrom: '',
    doubleDamageTo: '',
    halfDamageFrom: '',
    halfDamageTo: '',
    noDamageFrom: '',
    noDamageTo: '',
  });

  useEffect(() => {
    const fetchDamageRelations = async () => {
      const type = await api.pokemon.getTypeByName(name);
      const relations: DamageRelations = {
        doubleDamageFrom: type.damage_relations.double_damage_from
          .map((x) => capitalize(x.name))
          .join(', '),
        doubleDamageTo: type.damage_relations.double_damage_to
          .map((x) => capitalize(x.name))
          .join(', '),
        halfDamageFrom: type.damage_relations.half_damage_from
          .map((x) => capitalize(x.name))
          .join(', '),
        halfDamageTo: type.damage_relations.half_damage_to
          .map((x) => capitalize(x.name))
          .join(', '),
        noDamageFrom: type.damage_relations.no_damage_from
          .map((x) => capitalize(x.name))
          .join(', '),
        noDamageTo: type.damage_relations.no_damage_to
          .map((x) => capitalize(x.name))
          .join(', '),
      };
      setDamageRelations(relations);
    };
    fetchDamageRelations();
  }, [name]);

  // Return the detailed tile
  return (
    <div className={styles.grid}>
      <div className={styles.tile}>
        {/* onClick={handleTileClick} */}
        <div className={styles.damageData}>
          <div className="doubleDamageFrom">
            <p>2x damage from: {damageRelations.doubleDamageFrom}</p>
          </div>
          <div className="doubleDamageTo">
            <p>2x damage against: {damageRelations.doubleDamageTo}</p>
          </div>
          <div className="halfDamageFrom">
            <p>0.5x damage from: {damageRelations.halfDamageFrom}</p>
          </div>
          <div className="halfDamageTo">
            <p>0.5x damage to: {damageRelations.halfDamageTo}</p>
          </div>
          <div className="noDamageFrom">
            <p>No damage from: {damageRelations.noDamageFrom}</p>
          </div>
          <div className="noDamageTo">
            <p>No damage to: {damageRelations.noDamageTo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeTileDetailed;
