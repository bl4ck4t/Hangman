type HangamnWordProps = {
  reveal? : boolean
  guessedLetters : string[]
  wordToGuess : string
}


export function HangmanWord({reveal=false, guessedLetters, wordToGuess} : HangamnWordProps) {


  return (
    <div className="h_word">
      {wordToGuess.split("").map((letter, index) => (
        <span 
        style={{color: !guessedLetters.includes(letter) && reveal ? "red" : "black"}}
        className="h_word--answer" key={index}>
          <span className={`
          ${guessedLetters.includes(letter) || reveal ?
           "h_word--visibleAnswer" : "h_word--hiddenAnswer"}
          
          `}>{letter}</span>
        </span>
      ))}
    </div>
  )
}
