import './Square.scss';
import Typography from '../Typography/Typography';

interface SquareProps {
  value: string;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {

  const className = value === 'X' ? 'square--X' : value === 'O' ? 'square--O' : '';

  return (
    <div className={`square ${className}`} onClick={onSquareClick}>
      <Typography content={value} size="large" weight="bold" />
    </div>
  );
}

export default Square