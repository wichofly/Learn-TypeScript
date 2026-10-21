type NewGameButtonProps = {
  isGameOver: boolean;
  startNewGame: () => void;
};

const NewGameButton = ({ isGameOver, startNewGame }: NewGameButtonProps) => {
  return (
    <section>
      {isGameOver && (
        <button className="new-game" onClick={startNewGame}>
          New Game
        </button>
      )}
    </section>
  );
};

export default NewGameButton;
