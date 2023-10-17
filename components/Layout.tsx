import React, { useState, useEffect } from 'react';
import styles from './Layout.module.css';
import Image from 'next/image';
import SearchBar from './Search/SearchBar';
import Link from 'next/link';
import PokemonTile from './PokemonTile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerlogo}>
          <Link href="/">
            <Image src="/Pokeball.svg" alt="Home" width={40} height={40} />
          </Link>
        </div>
        <SearchBar
          onSearch={(query) => {
            setSelectedPokemon(query);
          }}
        />
      </header>
      <main className={styles.main}>
        {selectedPokemon && <PokemonTile name={selectedPokemon} />}
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
