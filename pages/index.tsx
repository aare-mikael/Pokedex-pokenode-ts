import Image from 'next/image';
import styles from './index.module.css';
import PokemonLogo from '../public/PokemonLogo.png';
import { fetchTypes } from '../api/fetchTypes';
import DropDown from '../components/DropDown';
import { useRouter } from 'next/navigation';
import { NamedObject } from '../interfaces/pokemonData';

function Logo() {
  return (
    <div className="logo">
      <Image
        src={PokemonLogo}
        alt="Pokemon Logo"
        width={820}
        height={450}
        priority
      />
    </div>
  );
}

interface GridH2Props {
  link: string;
  head: string;
  desc: string;
}

export function GridH2({ link, head, desc }: GridH2Props) {
  return (
    <a
      href={link}
      className={styles.card}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2>
        {head} <span>-&gt;</span>
      </h2>
      <p>{desc}</p>
    </a>
  );
}

interface ValueObject {
  value: string;
  label: string;
}

interface HomeProps {
  types: NamedObject[];
}

function Home({ types }: HomeProps) {
  const dropdownOptions: ValueObject[] = types.map((type) => ({
    value: type.id.toString(),
    label: type.name,
  }));

  const router = useRouter();

  const handleTypeChange = (selectedOption: ValueObject) => {
    const path = `/type/${selectedOption.label}`;
    router.push(path);
  };

  return (
    <div className="background">
      <main className={styles.main}>
        <div className={styles.description}>
          <div className={styles.dropdown}>
            <DropDown options={dropdownOptions} onChange={handleTypeChange} />
          </div>
        </div>

        <Logo />

        <div className={styles.grid}>
          <GridH2
            link="https://github.com/mazipan/graphql-pokeapi"
            head="PokeAPI"
            desc="Learn more about the API"
          />
          <GridH2
            link="https://graphql-pokeapi.vercel.app/api/graphql"
            head="Playground"
            desc="Explore the endpoint"
          />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const types = await fetchTypes();
  return {
    props: {
      types,
    },
  };
}

export default Home;
