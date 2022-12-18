import { useCallback, useEffect, useState } from "react"
import words from './wordList.json'
import "./app.css"
import {HangmanDrawing} from "../components/HangmanDrawing"
import {HangmanWord} from "../components/HangmanWord"
import {Keyboard} from "../components/Keyboard"

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {

  const [wordToGuess, SetWordToGuess] = useState(getWord);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
  .split("")
  .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if(guessedLetters.includes(letter) || isWinner || isLoser) return

    setGuessedLetters((letters) => {
      return [...letters, letter]
    })
  }, [guessedLetters, isWinner, isLoser])
  
  useEffect(() => {

    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if( !key.match(/^[a-z]$/)) return

      e.preventDefault();
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }

  }, [guessedLetters])

  useEffect(() => {

    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if( key !== "Enter") return

      setGuessedLetters([])
      SetWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }

  }, [])

  return (
    <div className="hangman--container">

      <div className="component--container">
          {isWinner && "You Won !!  -- Press ENTER for new Game"}
          {isLoser && "Nice Try !! -- Press ENTER for new Game"}
      </div>

      <HangmanDrawing numberOfGuesses = {incorrectLetters.length}/>
      <HangmanWord 
      reveal={isLoser}
      guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
        
      <div className="keyboard-component">
          <Keyboard 
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => 
          wordToGuess.includes(letter)
          )}
          
          inactiveLetters={incorrectLetters}
          
          addGuessedLetter={addGuessedLetter}/>
      </div>
    </div>
  )
}

export default App
