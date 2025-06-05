import { useEffect, useState } from "react";
import Card from "./Card";

function GameScreen() {
    const [pokemonData, setPokemonData] = useState();

    const generateRandomNum = () => {
        return Math.ceil(Math.random() * 151);
    }

    const fetchPokemon = async(pokemonIdList) => {
        const pokemonData = await Promise.all(
            pokemonIdList.map((id) => 
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    .then((res) => res.json())
                    .then((data) => ({
                        name: data.name,
                        image: data.sprites.other["official-artwork"].front_default,
                        id: id
                    }))
            )
        );
         
        return pokemonData;
    }

    useEffect(() => {
        const fetchData = async () => {
            const numSet = new Set();

            while(numSet.size < 7) {
                numSet.add(generateRandomNum());
            }

            const numList = Array.from(numSet);
            const fetchedPokemon = await fetchPokemon(numList);
            setPokemonData(fetchedPokemon);
        }

        fetchData();
    }, [])

    const cardClicked = (pokemonId) => {
        setPokemonData(pokemonData.map((pokemon) => 
            pokemon.id === pokemonId ? {...pokemon, hasBeenClicked: true} : pokemon
        ));
    }
    
    return (
        <div className="flex justify-center flex-wrap gap-10 p-40 mb-20">
            {pokemonData ? pokemonData.map((pokemon) => <Card pokemon={pokemon} cardClicked={cardClicked} key={pokemon.id} />) : "Loading..."}
        </div>
    )
}

export default GameScreen;