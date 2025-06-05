function Card({ pokemon, cardClicked }) {
    return (
        <div 
            className="w-70 h-80 flex flex-col justify-center items-center p-4 bg-black/40 rounded-lg"
            onClick={() => cardClicked(pokemon.id)}
        >
            <img src={pokemon.image} alt={pokemon.name} className="w-[200px] h-[200px] object-contain"/>
            <h2 className="text-6xl font-[pokemonPixelFont] text-white">{pokemon.name}</h2>
        </div>
    )
}

export default Card;