import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import PokemonsList from "../components/PokemonsList";
import useGenerations from "../hooks/useGenerations";

const Home: NextPage = () => {
  const [activeGeneration, setactiveGeneration] = useState("");
  const { data } = useGenerations();

  useEffect(() => {
    //set default value
    if (!activeGeneration && data) {
      setactiveGeneration(data.generations[0].name);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="List of pokemon cards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex items-center justify-center mt-10">
          <div className="inline-flex gap-3 " role="toolbar">
            {data?.generations.map(({ name }) => (
              <button
                onClick={() => setactiveGeneration(name)}
                key={name}
                className={`bg-transparent capitalize hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
                  name === activeGeneration ? " bg-blue-500 !text-white" : ""
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <PokemonsList generation={activeGeneration} />
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
