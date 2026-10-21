import Confetti from 'react-confetti';

const ConfettiContainer = ({ isGameWon }: { isGameWon: boolean }) => {
  if (!isGameWon) return null;

  return <Confetti recycle={false} numberOfPieces={1000} />;
};

export default ConfettiContainer;
