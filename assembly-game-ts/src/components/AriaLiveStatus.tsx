type ArialLiveStatusProps = {
  currentWord: string;
  lastGuessedLetter: string;
  numGuessesLeft: number;
  guessedLetters: string[];
};

const AriaLiveStatus = ({
  currentWord,
  lastGuessedLetter,
  numGuessesLeft,
  guessedLetters,
}: ArialLiveStatusProps) => {
  return (
    <section className="sr-only" aria-live="polite" role="status">
      <p>
        {currentWord.includes(lastGuessedLetter)
          ? `Correct! The letter ${lastGuessedLetter} is in the word.`
          : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
        You have {numGuessesLeft} attempts left.
      </p>
      <p>
        Current word:{' '}
        {currentWord
          .split('')
          .map((letter) =>
            guessedLetters.includes(letter) ? letter + '.' : 'blank.',
          )
          .join(' ')}
      </p>
    </section>
  );
};

export default AriaLiveStatus;
