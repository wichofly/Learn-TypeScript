import { clsx } from 'clsx';

type WordLettersProps = {
  currentWord: string;
  guessedLetters: string[];
  isGameLost: boolean;
};

const WordLetters = ({
  currentWord,
  guessedLetters,
  isGameLost,
}: WordLettersProps) => {
  const letterElements = currentWord.split('').map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && 'missed-letter',
    );
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ''}
      </span>
    );
  });

  return <section className="word">{letterElements}</section>;
};

export default WordLetters;
