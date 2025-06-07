"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

function calculateWinner(squares) {
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
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default function GamePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Player";

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Hello, {name}!</h2>
      <h1>Tic Tac Toe</h1>
      <div style={{ margin: "20px auto", width: "180px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 60px)",
            gap: "0px",
            width: "182px",
            margin: "30px auto",
            border: "4px solid brown",
            borderRadius: "12px",
            padding: "10px",
            background: "#fffbe6",
          }}
        >
          {squares.map((square, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              style={{
                width: "60px",
                height: "60px",
                fontSize: "2.5rem",
                cursor: square || winner ? "not-allowed" : "pointer",
                background: "#fff",
                border: "2px solid brown",
                color: square === "X" ? "red" : square === "O" ? "green" : "brown",
                outline: "none",
                transition: "color 0.2s",
              }}
            >
              {square}
            </button>
          ))}
        </div>
      </div>
      <div style={{ margin: "20px", fontSize: "1.2rem" }}>{status}</div>
      <button
        onClick={handleRestart}
        style={{
          padding: "8px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Restart
      </button>
    </div>
  );
}