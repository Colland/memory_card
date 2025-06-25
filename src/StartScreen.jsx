import MenuArrowItem from "./MenuArrowItem";
import { useState } from "react";

function StartScreen( {startGame }) {
    const [chosenDifficulty, setChosenDifficulty] = useState("Easy");
    const [chosenGeneration, setChosenGeneration] = useState("I");

    console.log(chosenDifficulty);

    return (
        <div className="flex flex-col items-center gap-4 bg-white w-[600px] h-[420px] p-4 rounded-lg border-4 text-center border-black font-[pokemonPixelFont] text-[54px] leading-[1]">
            <p>Choose a generation and a difficulty!</p>

            <div className="flex gap-30 text-5xl">
                <ul>
                    Difficulty
                    <MenuArrowItem text="Easy"
                                   active={chosenDifficulty === "Easy"}
                                   onClick={() => setChosenDifficulty("Easy")}
                    />
                    <MenuArrowItem text="Medium"
                                   active={chosenDifficulty === "Medium"} 
                                   onClick={() => setChosenDifficulty("Medium")} 
                    />
                    <MenuArrowItem text="Hard"
                                   active={chosenDifficulty === "Hard"}
                                   onClick={() => setChosenDifficulty("Hard")}
                    />
                </ul>

                <ul>
                    Generation
                    <MenuArrowItem text="I"
                                   active={chosenGeneration === "I"}
                                   onClick={() => setChosenGeneration("I")}
                    />
                    <MenuArrowItem text="II"
                                   active={chosenGeneration === "II"}
                                   onClick={() => setChosenGeneration("II")}
                    />
                    <MenuArrowItem text="III"
                                   active={chosenGeneration === "III"}
                                   onClick={() => setChosenGeneration("III")}
                    />
                </ul>
            </div>

            <button
                className="text-5xl cursor-pointer"
                onClick={() => startGame(chosenDifficulty, chosenGeneration)}
            >
                Start game!
            </button>
        </div>
    )
}

export default StartScreen;