import styles from './[type].module.css';
import { fetchPokemon } from '@/api/fetchPokemon';
import PokemonTile from '@/components/PokemonTile';
import { PokemonData } from '@/interfaces/pokemonData';
import { fetchTypes } from '@/api/fetchTypes';
import DropDown from '../../components/DropDown';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface TypePageProps {
  pokemon: PokemonData[];
  dropdownOptions: ValueObject[];
}

interface ValueObject {
  value: string;
  label: string;
}

const TypePage = ({ pokemon, dropdownOptions }: TypePageProps) => {
  const router = useRouter();

  if (!pokemon) return <></>;

  const handleTypeChange = (selectedOption: ValueObject) => {
    const path = `/type/${selectedOption.label}`;
    router.push(path);
  };

  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <div className="home-button">
          <Link href="/">
            <Image src="/Pokeball.svg" alt="Pokeball" width={75} height={75} />
          </Link>
        </div>
        <DropDown options={dropdownOptions} onChange={handleTypeChange} />
        <br />
      </div>
      <div className={styles.grid}>
        {pokemon.map((x, i) => {
          return <PokemonTile key={i} name={x.name} />;
        })}
      </div>
    </div>
  );
};

const getPokemon = async () => {
  let pokemonArray: PokemonData[] = await fetchPokemon(100);
  return pokemonArray;
};

// function filterByTypeID(pokemonArray: PokemonData[], typeID: number) {
//   return pokemonArray.filter((x) => x.types.some((y) => y.type.id === typeID));
// }

function filterByType(pokemonArray: PokemonData[], typeName: string) {
  return pokemonArray.filter((x) =>
    x.types.some((y) => y.type.name === typeName)
  );
}

//@ts-ignore
export async function getServerSideProps({ query }) {
  const type = query.type;
  // const typeID = Number(query.id);
  const types = await fetchTypes();

  // let invalidType = false;
  // if (typeID)
  //   invalidType = !types.some((allowedType) => allowedType.id === typeID);
  // else
  const invalidType = !types.some((allowedType) => allowedType.name === type);

  const dropdownOptions: ValueObject[] = types.map((type) => ({
    value: type.id.toString(),
    label: type.name,
  }));

  if (invalidType)
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };

  // let filteredPokemon: PokemonData[] = [];
  const pokemon = await getPokemon();
  // if (typeID) filteredPokemon = filterByTypeID(pokemon, typeID);
  // else
  const filteredPokemon = filterByType(pokemon, type);

  return {
    props: {
      pokemon: filteredPokemon,
      dropdownOptions,
    },
  };
}

export default TypePage;
