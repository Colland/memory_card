import { useEffect, useState } from "react";
import { shuffleArray } from "../utils";
import Card from "./Card";

function GameScreen() {
    const [pokemonData, setPokemonData] = useState(null);
    const filteredPokemon = pokemonData ? filterPokemon(7) : null;

    console.table(pokemonData);

    useEffect(() => {
        const fetchData = async () => {
            const numSet = new Set();

            while(numSet.size < 10) {
                numSet.add(generateRandomNum());
            }

            const numList = Array.from(numSet);
            const fetchedPokemon = await fetchPokemon(numList);
            setPokemonData(fetchedPokemon);
        }

        fetchData();
    }, [])

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
                        id: id,
                        hasBeenClicked: false
                    }))
            )
        );
         
        return pokemonData;
    }

    const cardClicked = (pokemonId) => {
        setPokemonData(prevData => { 
            const updatedData = prevData.map((pokemon) => 
                pokemon.id === pokemonId ? {...pokemon, hasBeenClicked: true} : pokemon
            )
            
            return shuffleArray(updatedData);
        });
    }

    function filterPokemon(length) {
        const filteredPokemon = pokemonData.slice(0, length);

        // Ensure at least one pokemon in the filtered list has never been clicked/selected.
        if(filteredPokemon.filter((pokemon) => pokemon.hasBeenClicked === false).length === 0) {
            for(const pokemon of pokemonData) {
                if(pokemon.hasBeenClicked === false) {
                    filteredPokemon[0] = pokemon;
                    break;
                }
            }
        }

        return filteredPokemon;
    }
    

    return (
        <div className="flex justify-center flex-wrap gap-10 p-40 mb-20">
            {pokemonData ? filteredPokemon.map((pokemon) => <Card pokemon={pokemon} cardClicked={cardClicked} key={pokemon.id} />) : "Loading..."}
        </div>
    )
}

export default GameScreen;