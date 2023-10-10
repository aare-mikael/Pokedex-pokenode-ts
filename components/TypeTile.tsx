import { useState, useEffect } from 'react';
import Image from 'next/image';
import { api } from '@/api/api';
import styles from '../pages/index.module.css';
import { useRouter } from 'next/navigation';

interface TypeTileProps {
  name: string;
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

interface DamageRelations {
  doubleDamageFrom: string;
  doubleDamageTo: string;
  halfDamageFrom: string;
  halfDamageTo: string;
  noDamageFrom: string;
  noDamageTo: string;
}

const TypeTile = ({ name }: TypeTileProps) => {
  const router = useRouter();

  const handleTileClick = () => {
    const path = `/type/${name}`;
    router.push(path);
  };

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

  const cName = capitalize(name);
  return (
    <div className="type-tile" onClick={handleTileClick}>
      <div className={styles.card}>
        <div className="type-tile-headline">
          <div className="type-tile-typename">
            <h1>{cName}</h1>
          </div>
          <div className="type-tile-typeimage">
            <Image
              src={`/types/${cName}.png`}
              alt={cName}
              width={75}
              height={30}
            />
          </div>
        </div>
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
  );
};

export default TypeTile;
