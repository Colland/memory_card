import pikachuImg from './assets/pikachu.png';
import GameScreen from './game/GameScreen';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="h-30 flex justify-center items-center">
        <h1 className="text-[100px] font-['pokemonPixelFont'] font-semibold text-blue-50 ml-[70px]"
            style={{
                    textShadow: `
                        -2px -2px 0 #000,
                        -2px -1px 0 #000,
                        -2px  0px 0 #000,
                        -2px  1px 0 #000,
                        -2px  2px 0 #000,
                        -1px -2px 0 #000,
                        -1px -1px 0 #000,
                        -1px  0px 0 #000,
                        -1px  1px 0 #000,
                        -1px  2px 0 #000,
                         0px -2px 0 #000,
                         0px -1px 0 #000,
                         0px  1px 0 #000,
                         0px  2px 0 #000,
                         1px -2px 0 #000,
                         1px -1px 0 #000,
                         1px  0px 0 #000,
                         1px  1px 0 #000,
                         1px  2px 0 #000,
                         2px -2px 0 #000,
                         2px -1px 0 #000,
                         2px  0px 0 #000,
                         2px  1px 0 #000,
                         2px  2px 0 #000
                    `
                }}
          >
            <span className="text-red-500">Poke</span> Dex
        </h1>
        <img src={pikachuImg} alt="pikachu" className="h-[4.2rem] mb-4 mr-3" />
      </header>
      
      <main className="flex items-end grow-1">
        <GameScreen />
      </main>
      
      <footer className="h-30">

      </footer>
    </div>
  )
}

export default App
