import React from 'react'
import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      location: [-1, -1],
    },
  ])
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [asc, setAsc] = useState(true);

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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          name: squares[a],
          lines: [a, b, c],
        };
      }
    }

    return null;
  }

  const handleClick = (i) => {
    const ihistory = history.slice(0, stepNumber + 1);
    const current = ihistory[ihistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)?.name || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(ihistory.concat([
      { squares: squares, location: [Math.floor(i / 3) + 1, (i % 3) + 1] },
    ]));
    setStepNumber(ihistory.length);
    setXIsNext(!xIsNext);
  }

  const resetGame = () => {
    setHistory([
      {
        squares: Array(9).fill(null),
        location: [-1, -1],
      },
    ]);
    setStepNumber(0);
    setXIsNext(true);
    setAsc(true);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares)?.name;
  const lines = calculateWinner(current.squares)?.lines
      ? calculateWinner(current.squares).lines
      : [-1, -1, -1];
  const moves = history.map((step, move) => {
        if (!asc) {
          move = history.length - move -1
        }
          const desc = move
            ? "Go to move #" +
              move +
              "(" +
              history[move].location[0] +
              ", " +
              history[move].location[1] +
              ")"
            : "Go to game start";
          return (
            <li key={desc}>
              <button
                id="btnMove"
                className="btn btn-outline-dark mt-3"
                onClick={() => jumpTo(move)}
              >
                {desc}
              </button>
            </li>
          );
        })
    let status;

    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    if (history.length - 1 === 9 && !winner) {
      status = "Winner: 2 players are equal";
    }

  return (
    <div className="game text-center mt-5" style={{ position: "relative" }}>
        <div className="row">
          <div className="col-3">
            <button
              style={{ width: 130 }}
              className="btn btn-info ml-5 mt-5"
              onClick={() =>
                setAsc(!asc)
              }
            >
              Sort
            </button>
            <ul>{moves}</ul>
          </div>
          <div className="col-6">
            <div className="game-board">
              <Board
                squares={current.squares}
                lines={lines}
                onClick={(i) => handleClick(i)}
              />
            </div>
            <div className="game-info mt-5">
              <div className="status" style={{ fontSize: "1.5rem" }}>
                {status}
              </div>

              <button
                className="btn btn-outline-dark mt-5"
                onClick={() => resetGame()}
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
