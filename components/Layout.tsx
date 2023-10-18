import React, { useState, useEffect } from 'react';
import styles from './Layout.module.css';
import Image from 'next/image';
import SearchBar from './Search/SearchBar';
import Link from 'next/link';
import PokemonTile from './PokemonTile';
import TypeTile from './TypeTile';
import AbilityTile from './AbilityTile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<
    Array<{
      item: string;
      filter: 'pokemon' | 'types' | 'abilities';
      entering: boolean;
    }>
  >([]);

  const addResult = (item: string, filter: 'pokemon' | 'types') => {
    const newResult = { item, filter, entering: true };
    setSearchResults((prevResults) => [newResult, ...prevResults]);

    setTimeout(() => {
      setSearchResults((prevResults) =>
        prevResults.map((result) => {
          if (result === newResult) {
            return { ...result, entering: false };
          } else {
            return result;
          }
        })
      );
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerlogo}>
          <Link href="/">
            <Image src="/Pokeball.svg" alt="Home" width={40} height={40} />
          </Link>
        </div>
        <SearchBar
          onSearch={(query, filter) => {
            addResult(query, filter);
          }}
        />
      </header>
      <main className={styles.main}>
        {searchResults.map((result, i) => (
          <div key={i} className={`${result.entering ? styles.entering : ''}`}>
            {result.filter === 'pokemon' ? (
              <PokemonTile name={result.item} />
            ) : result.filter === 'types' ? (
              <TypeTile name={result.item} />
            ) : (
              <AbilityTile name={result.item} />
            )}
          </div>
        ))}
        {children}
      </main>
      <footer className={styles.footer}>
        <p>© 2023 Pokedex by Mikael Aare</p>
        <div className={styles.footerLink}>
          <a href="https://www.linkedin.com/in/mikaelaare/">
            Click here to find me on LinkedIn
          </a>
        </div>
        <div className={styles.footerLink}>
          <a href="https://github.com/aare-mikael/Pokedex-pokenode-ts">
            Click here to explore the repository for this project
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
