import { useEffect, useState } from "react";
import { shuffleArray } from "../utils";
import Card from "./Card";

function GameScreen() {
    const [pokemonData, setPokemonData] = useState(null);
    const filteredPokemon = pokemonData ? filterPokemon(20) : null;

    const [lives, setLives] = useState(3);
    const [gameIsOver, setGameIsOver] = useState(false);
    const [score, setScore] = useState(0);

    console.log(lives);

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
                        image: data.sprites.front_default,
                        id: id,
                        types: data.types.map(type => type.type.name),
                        height: data.height,
                        hasBeenClicked: false
                    }))
            )
        );
         
        return pokemonData;
    }

    const cardClicked = (pokemonId) => {
        const foundPokemon = pokemonData.find((pokemon) => pokemon.id === pokemonId)
        console.table(foundPokemon);

        if(foundPokemon.hasBeenClicked === true) {
            setLives(lives - 1);

            if((lives - 1) === 0) {
                gameOver();
            }
            else {
                setPokemonData(shuffleArray(pokemonData));
            }
        }
        else {
            setScore(score + 1);
            setPokemonData(prevData => { 
                const updatedData = prevData.map((pokemon) => 
                    pokemon.id === pokemonId ? {...pokemon, hasBeenClicked: true} : pokemon
                )
                
                return shuffleArray(updatedData);
            });
        }
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

    function gameOver() {
        setGameIsOver(true);
    }
    

    if(gameIsOver) {
        return (
            <div>
                <h1>GAME OVER BOY</h1>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-center items-center gap-10 mt-[-20px]">
                <p className="text-6xl text-white font-[pokemonPixelFont] rounded-xl pt-1 pb-1 pl-6 pr-6">Score: &nbsp;{score}</p>
                <p className="text-6xl text-white font-[pokemonPixelFont] rounded-xl pt-1 pb-1 pl-6 pr-6">Lives: &nbsp;{lives}</p>
            </div>

            <div className="flex justify-center flex-wrap gap-10 p-40">
                {pokemonData ? filteredPokemon.map((pokemon) => <Card pokemon={pokemon} cardClicked={cardClicked} key={pokemon.id} />) : "Loading..."}
            </div>
        </div>
    )
}

export default GameScreen;