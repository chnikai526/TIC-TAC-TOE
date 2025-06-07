import { useState } from 'react';
import Square from './Square';
import GameStatus from './GameStatus';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "It's a Draw!"
    : `Next Player: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <GameStatus status={status} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 60px)',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        {squares.map((val, idx) => (
          <Square key={idx} value={val} onClick={() => handleClick(idx)} />
        ))}
      </div>
      <button
        onClick={resetGame}
        style={{ marginTop: '20px', padding: '8px 16px', cursor: 'pointer' }}
      >
        Restart Game
      </button>
    </div>
  );
}
