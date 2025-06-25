import { useState } from "react";
import pikachuImg from './assets/pikachu.png';
import GameScreen from './game/GameScreen';
import StartScreen from './StartScreen';
import { heavyTextShadow } from './styles/textShadows';

function App() {
  const [activeView, setActiveView] = useState("startScreen");
  const [chosenDifficulty, setChosenDifficulty] = useState("Easy");
  const [chosenGeneration, setChosenGeneration] = useState("I");

  function startGame (difficulty, generation) {
    setChosenDifficulty(difficulty);
    setChosenGeneration(generation);
    setActiveView("gameScreen");
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="h-30 flex justify-center items-center">
        <h1 className="text-[100px] font-['pokemonPixelFont'] font-semibold text-blue-50 ml-[70px]"
            style={{
                    textShadow: heavyTextShadow
                }}
          >
            <span className="text-red-500">Poke</span> Dex
        </h1>
        <img src={pikachuImg} alt="pikachu" className="h-[4.2rem] mb-4 mr-3" />
      </header>
      
      <main className="flex justify-center items-center grow-1">
        {activeView === "startScreen" ? <StartScreen startGame={startGame} /> : <GameScreen difficulty={chosenDifficulty} generation={chosenGeneration} />}
      </main>
      
      <footer className="h-30">

      </footer>
    </div>
  )
}

export default App;