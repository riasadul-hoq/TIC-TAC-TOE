/* eslint-disable react/prop-types */

import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      type="button"
      onClick={onSquareClick}
      className="text-3xl font-medium w-24 h-24 border border-gray-400 m-1 leading-9 bg-white "
    >
      {value}
    </button>
  );
}

function Board({ squares, isXNext, onPlay, currentMove }) {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `${winner} is the winner`;
  } else if (currentMove > 8) {
    status = `It's a Draw!`;
  } else {
    status = `Next Player is ${isXNext ? "X" : "O"}`;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    if (isXNext) {
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }
    onPlay(newSquares);
  }

  return (
    <>
      <div className="text-center font-medium text-2xl text-red-600 m-4">
        {status}
      </div>

      <div className="flex justify-center">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="flex justify-center">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="flex justify-center">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function History({ moves }) {
  return (
    <div className="flex justify-center m-4">
      <ol>{moves}</ol>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isXNext, setIsXNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  console.log(`h ${history}`);
  const currentSquares = history[currentMove];
  console.log(`current ${currentSquares}`);

  function handlePlay(newSquares) {
    setIsXNext(!isXNext);
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    console.log(`Next History: ${nextHistory}`);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  console.log(`history: ${history}`);

  function jumpTo(move) {
    setCurrentMove(move);
    setIsXNext(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to start of the game`;
    }

    console.log(`move:${move}`);
    console.log(`squares:${squares}`);

    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className=" mb-3 p-2 bg-slate-300 font-medium text-2xl text-red-600 rounded-sm"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="container mx-auto m-4 p-4">
      <h1 className="text-center font-medium text-3xl underline m-4">
        TIC TAC TOE- Let&apos;s Play!
      </h1>
      <div className="flex justify-center gap-4">
        <div className="mr-16">
          <Board
            isXNext={isXNext}
            squares={currentSquares}
            onPlay={handlePlay}
            currentMove={currentMove}
          ></Board>
        </div>
        <div className="border border-gray-400 p-1 text-lg">
          <History moves={moves} />
        </div>
      </div>
    </div>
  );
}

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
