import { useEffect, useState } from "react";
import { shuffleArray } from "../utils";
import { motion } from "framer-motion";
import Card from "./Card";
import { heavyTextShadow } from "../styles/textShadows";
import { totalPokemonPerDifficulty, generations, generationFloor } from "../data/gameData";
import pokeballLoader from "../assets/pokeball_loader.png";

function GameScreen({ difficulty, generation }) {
    const [pokemonData, setPokemonData] = useState(null);
    const filteredPokemon = pokemonData ? filterPokemon(totalPokemonPerDifficulty[difficulty]) : null;
    const pokemonToFetch = totalPokemonPerDifficulty[difficulty] || 10;

    const hardCodedLives = 3;
    const [lives, setLives] = useState(hardCodedLives);
    const [gameIsOver, setGameIsOver] = useState(false);
    const [score, setScore] = useState(0);

    const [loading, setLoading] = useState(true);

    console.log(lives);

    useEffect(() => {
        const fetchData = async () => {
            const numSet = new Set();

            while(numSet.size < pokemonToFetch) {
                numSet.add(generateRandomNum());
            }

            const numList = Array.from(numSet);
            console.log(numList)
            const fetchedPokemon = await fetchPokemon(numList);
            setTimeout(() => {
                            setPokemonData(fetchedPokemon);
                            setLoading(false);
            }, 5000)
        }

        fetchData();
    }, [])

    const generateRandomNum = () => {
        return Math.ceil((Math.random() * generations[generation]) + generationFloor[generation]);
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

            if(score+1 === pokemonToFetch) {
                gameOver();
            }
            else {
                setPokemonData(prevData => { 
                    const updatedData = prevData.map((pokemon) => 
                        pokemon.id === pokemonId ? {...pokemon, hasBeenClicked: true} : pokemon
                    )
                    
                    return shuffleArray(updatedData);
                });
            }
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

    function resetGame() {
        setLives(hardCodedLives);
        setScore(0);
        setGameIsOver(false);
    }

    if(gameIsOver) {
        if(lives <= 0) {
            return (
                <div className="flex flex-col justify-start items-center self-center gap-4 w-96 h-48 p-4 m-auto rounded-lg bg-white border-4 border-black text-6xl font-[pokemonPixelFont] text-black">
                    <p>You lost!</p>
                    <motion.p
                        animate={{ scale: 1.2 }}
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1}}
                        onClick={resetGame}
                        className="cursor-pointer"
                    >
                        Try again?
                    </motion.p>
                </div>
            )
        }
        else {
            return (
                <div className="flex flex-col justify-start items-center gap-4 w-96 h-48 p-4 m-auto rounded-lg bg-white border-4 border-black text-6xl font-[pokemonPixelFont] text-black">
                    <p>You won!</p>
                    <motion.p
                        animate={{ scale: 1.2 }}
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1}}
                        onClick={resetGame}
                        className="cursor-pointer"
                    >
                        Play again?
                    </motion.p>
                </div>
            )
        }
    }

    if(loading) {
        return (
            <img src={pokeballLoader}
                 alt="loading..."
                 className="w-32 h-32 animate-spin" 
            />
        )
    }
    else {
        return (
            <div>
                <div className="flex justify-center items-center gap-10 mt-[-20px]">
                    <motion.p
                        key={`score-${score}`}
                        animate={{ color: "#22e920", scale: 1.2 }}
                        transition={{ repeat: 1, repeatType: "reverse", duration: 0.2 }}
                        className="text-6xl text-white font-[pokemonPixelFont] rounded-xl pt-1 pb-1 pl-6 pr-6"
                        style={{
                            textShadow: heavyTextShadow
                        }}
                    >
                        Score: &nbsp;{score}
                    </motion.p>
                    <motion.p
                        key={`lives-${lives}`}
                        animate={{ color: "#fb2c36", scale: 1.2 }}
                        transition={{ repeat: 1, repeatType: "reverse", duration: 0.2 }}
                        className="text-6xl text-white font-[pokemonPixelFont] rounded-xl pt-1 pb-1 pl-6 pr-6"
                        style={{
                            textShadow: heavyTextShadow
                        }}
                    >
                            Lives: &nbsp;{lives}
                    </motion.p>
                </div>

                <div className="flex justify-center flex-wrap gap-10 p-42">
                    {filteredPokemon.map((pokemon) => <Card pokemon={pokemon} cardClicked={cardClicked} key={pokemon.id} />)}
                </div>
            </div>
        )
    }
}

export default GameScreen;