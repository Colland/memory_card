import pikachuImg from './assets/pikachu.png';
import GameScreen from './game/GameScreen';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="h-30 flex justify-center items-center">
        <h1 className="text-[100px] font-['pokemonPixelFont'] font-semibold text-blue-50 ml-[70px]">
          <span className="text-red-500">Poke</span> Dex
        </h1>
        <img src={pikachuImg} alt="pikachu" className="h-[4.2rem] mb-4 mr-3" />
      </header>
      
      <main className="flex items-end">
        <GameScreen />
      </main>
      
      <footer className="h-30">

      </footer>
    </div>
  )
}

export default App
