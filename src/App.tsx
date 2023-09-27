import { useState, useEffect } from 'react';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Square from './components/Square/Square';
import Typography from './components/Typography/Typography';
import devFox from './assets/images/devfox.png';
import content from './content/content.json';
import './App.scss';

function App() {
  const PLAYER_X: string = 'X';
  const PLAYER_O: string = 'O';

  const initialSquares = Array(9).fill(null);
  const initialScores = { [PLAYER_X]: 0, [PLAYER_O]: 0 };

  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scores, setScores] = useState(initialScores);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };

  const winner = calculateWinner(squares);
  const isDraw = squares.every((square) => square !== null);

  const status = winner
  ? `${content.game.winningText} ${winner}`
  : isDraw
  ? content.game.drawText
  : `${content.game.nextTurnText} ${xIsNext ? PLAYER_X : PLAYER_O}`;

  if (winner || isDraw) {
    if (isDisabled) setIsDisabled(false);
  }

  useEffect(() => {
    if (winner) setScores((prevScores) => ({ ...prevScores, [winner]: prevScores[winner] + 1 }));
  }, [winner]);

  const toggleButton = () => setIsDisabled(!isDisabled);
  
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSquareClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? PLAYER_X : PLAYER_O;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetBoard = () => {
    setSquares(initialSquares);
  };

  const resetScores = () => {
    setScores(initialScores);
  };

  const setNewRound = () => {
    resetBoard();
    toggleButton();
  };

  const resetGame = () => {
    resetBoard();
    resetScores();
    setXIsNext(true);
    toggleModal();
  };

  return isModalOpen ? (
    <Modal onCancelButtonClick={toggleModal} onResetButtonClick={resetGame} />
  ) : (
    <div className="game">
      <img className="game__image" src={devFox} alt="DevFox" />
      <Typography as="h1" content={content.game.titleText} size="large" weight="bold" />
      <Typography content={status} />
      <div className="game__board">
        {[0, 1, 2].map((row) => (
          <div className="game__board-row" key={row}>
            {[0, 1, 2].map((col) => (
              <Square
                key={col}
                value={squares[row * 3 + col]}
                onSquareClick={() => handleSquareClick(row * 3 + col)} />
            ))}
          </div>
        ))}
      </div>
      <div className="game__button-container">
        <Button
          color="green"
          content={content.game.newRoundButtonText}
          isDisabled={isDisabled}
          onButtonClick={setNewRound} />
        <Button
          color="yellow"
          content={content.game.resetButtonText}
          onButtonClick={toggleModal} />
      </div>
      <div className="game__score-container">
        <Typography content={content.game.scoreText} size="medium" weight="bold" />
        <Typography content={`${PLAYER_X}: ${scores.X} | ${PLAYER_O}: ${scores.O}`} />
      </div>
    </div>
  );
}

export default App;