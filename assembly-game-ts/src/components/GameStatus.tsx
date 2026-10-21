import { clsx } from 'clsx';
import { languages } from '../languages';
import { getFarewellText } from '../utils';

type GameStatusProps = {
  isGameWon: boolean;
  isGameLost: boolean;
  isGameOver: boolean;
  isLastGuessIncorrect: string | boolean;
  wrongGuessCount: number;
};

const GameStatus = ({
  isGameWon,
  isGameLost,
  isGameOver,
  isLastGuessIncorrect,
  wrongGuessCount,
}: GameStatusProps) => {
  const gameStatusClass = clsx('game-status', {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  return (
    <section aria-live="polite" role="status" className={gameStatusClass}>
      {!isGameOver && isLastGuessIncorrect && (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      )}

      {isGameWon && (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )}

      {isGameLost && (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )}
    </section>
  );
};

export default GameStatus;
