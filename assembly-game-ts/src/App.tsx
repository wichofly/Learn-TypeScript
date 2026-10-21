import { useState } from 'react';
import { languages } from './languages';
import { getRandomWord } from './utils';

import AriaLiveStatus from './components/AriaLiveStatus';
import ConfettiContainer from './components/ConfettiContainer';
import GameStatus from './components/GameStatus';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import LanguageChips from './components/LanguageChips';
import WordLetters from './components/WordLetters';
import NewGameButton from './components/NewGameButton';

export default function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = useState<string>(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  // Derived values
  const numGuessesLeft = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;
  const isGameWon = currentWord
    .split('')
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= numGuessesLeft;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  // Static values

  function addGuessedLetter(letter: string) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter],
    );
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      <ConfettiContainer isGameWon={isGameWon} />
      <Header />

      <GameStatus
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isGameOver={isGameOver}
        isLastGuessIncorrect={isLastGuessIncorrect}
        wrongGuessCount={wrongGuessCount}
      />

      <LanguageChips wrongGuessCount={wrongGuessCount} />

      <WordLetters
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameLost={isGameLost}
      />

      <AriaLiveStatus
        currentWord={currentWord}
        lastGuessedLetter={lastGuessedLetter}
        numGuessesLeft={numGuessesLeft}
        guessedLetters={guessedLetters}
      />

      <Keyboard
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameOver={isGameOver}
        addGuessedLetter={addGuessedLetter}
      />

      <NewGameButton isGameOver={isGameOver} startNewGame={startNewGame} />
    </main>
  );
}
