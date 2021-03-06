import Color from "color";
const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

interface IPokemonType {
  types: Array<{ type: { name: string } }>;
}

interface IPokemonCardProps {
  id: number;
  name: string;
  types: IPokemonType[];
  openModal: (id: number) => void;
}

function PokemonCard({ id, name, types, openModal }: IPokemonCardProps) {
  let pokemonTypes = types.reduce((acc, val) => acc.concat(val.types), []);
  //filter unique values of type cause of a bug in the api that returns duplicates for some pokemons
  pokemonTypes = [
    ...pokemonTypes
      .reduce((map, obj) => map.set(obj.type.name, obj), new Map())
      .values(),
  ];

  const getBackgroundType = (type: IPokemonType[]) => {
    const pokeType = type[0].type.name;
    return `radial-gradient(circle at 50% 0%, ${typeColor[pokeType]} 36%, #fff 36%)`;
  };

  const renderPokemonType = (types: IPokemonType[]) => {
    return types.map((type) => {
      const typeName = type.type.name;
      return (
        <div
          key={typeName}
          className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 text-blue-700 rounded-full`}
          style={{
            backgroundColor: typeColor[typeName],
            color: Color(typeColor[typeName]).darken(0.5),
          }}
        >
          {typeName}
        </div>
      );
    });
  };

  return (
    <div
      className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/5 transform transition duration-500 hover:scale-110 cursor-pointer"
      onClick={() => openModal(id)}
    >
      <article
        className="overflow-hidden rounded-lg shadow-lg"
        style={{
          background: getBackgroundType(pokemonTypes),
        }}
      >
        <img
          className="block h-40 mx-auto my-10"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt={name}
        />
        <div className="flex items-center justify-center leading-tight p-2 md:p-4">
          <h1 className="text-lg font-semibold capitalize text-black">
            {name}
          </h1>
        </div>

        <div className="flex items-center justify-center leading-none p-2 md:p-4 gap-4">
          {renderPokemonType(pokemonTypes)}
        </div>
      </article>
    </div>
  );
}

export default PokemonCard;
