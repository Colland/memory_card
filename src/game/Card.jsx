import { motion } from "framer-motion";
import { steelGradient } from "../styles/steelGradient";

function Card({ pokemon, cardClicked }) {
    const typeColors = {
        grass: "#e1ffeb",
        bug: "#CAE5B4",
        poison: "#e9cdf5",
        water: "#c2e8f5",
        ground: "#e9d5a1",
        rock: "#f1e7b6",
        normal: "#f1f0ea",
        electric: "#FFFFB7",
        psychic: "#fdccec",
        fire: "#f5ac8e",
        fighting: "#FFA1A1",
        dragon: "#ceb9ff",
        ice: "#a2f3ff",
        fairy: "#EE99AC",
        ghost: "#e700f952",
        dark: "#453620e6",
        steel: ""
    }

    const formatHeight = (num) => {
        return num/10 + " m";
    }

    const cardColor = typeColors[pokemon.types[0]] || "#000000";

    return (
        <motion.div
            layout 
            className="w-60 h-80 flex flex-col justify-start items-center p-4 pt-0 border-4 border-[#696969] rounded-lg font-[pokemonPixelFont]"
            onClick={() => cardClicked(pokemon.id)}
            style={{
                background: pokemon.types[0] === "steel" ? steelGradient : cardColor,
                color: pokemon.types[0] === "dark" ? "#FFFFFF" : "#101828"
             }}
            whileHover={{ scale: 1.05 }}
        >
            <h2 className="text-3xl self-start">{pokemon.name}</h2>
            <div className="bg-white rounded-xl h-[150px] border-[#696969] border-4">
                <img src={pokemon.image} alt={pokemon.name} className="w-[200px] h-[192px] object-contain"/>
            </div>
            <div className="mt-4 flex flex-col self-start text-2xl">
                <p>Types: {pokemon.types[0]}</p>
                <p>Height: {formatHeight(pokemon.height)}</p>
                <p>Generation: I</p>
            </div>
        </motion.div>
    )
}

export default Card;