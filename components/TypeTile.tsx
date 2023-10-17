import React, { useState } from 'react';
import Image from 'next/image';
import styles from './TypeTile.module.css';
import { useRouter } from 'next/navigation';
import TypeTileDetailed from './TypeTileDetailed';

interface TypeTileProps {
  name: string;
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const TypeTile = ({ name }: TypeTileProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  // const handleTileClick = () => {
  //   const path = `/type/${name}`;
  //   router.push(path);
  // };

  const handleTileClick = () => {
    // setShowDetails(!showDetails);
    setIsExpanded(!isExpanded);
  };

  const cName = capitalize(name);
  return (
    <div className={styles.grid}>
      <div
        className={
          isExpanded ? `${styles.tile} ${styles.expanded}` : styles.tile
        }
        onClick={handleTileClick}
      >
        <div className={styles.typeimage}>
          <Image
            src={`/types/${cName}.png`}
            alt={cName}
            width={100}
            height={40}
          />
        </div>
      </div>
      {isExpanded && <TypeTileDetailed name={name} />}
      {/* {showDetails && <TypeTileDetailed name={name} />} */}
    </div>
  );
};

export default TypeTile;
