import React, { Component } from "react";
import Board from "./Board";
import Mask from "./Mask";  
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      count: 0,
    };
  }

  calculateWinner(squares) {
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
            name:squares[a],
            lines: [a, b, c],
        };
      }
    }

    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares)?.name || squares[i]) {
        // const listWin = this.calculateWinner(squares);
        // listWin.forEach((element) => {
        //     squares[element].outline = true;
        // })
        // this.setState({
        //     history: history.concat([{ squares: squares}]),
        // })
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    // console.log(squares);
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      count: this.state.count + 1,
    });
  }

  resetGame() {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      count: 0,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares)?.name;
    const lines = this.calculateWinner(current.squares)?.lines ? this.calculateWinner(current.squares).lines : [-1, -1, -1];
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={desc} >
          <button className="btn btn-outline-dark mt-3" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    console.log(this.state.count,winner)
    
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    if (this.state.count === 9 && !winner) {
        status = "Winner: 2 players are equal";
    }
    return (
      <div className="game text-center" style={{position: "relative"}}>
        <div className="row" >
          <div className="col-3" >
            <ul>{moves}</ul>
          </div>
          <div className="col-6">
            <div className="game-board">
              <Board
                squares={current.squares}
                lines = {lines}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className="game-info mt-5">
            <div className="status" style={{ fontSize: "1.5rem" }}>
                {status}
              </div>

              <button
            className="btn btn-outline-dark mt-5"
            onClick={() => this.resetGame()}
          >
            PLAY AGAIN
          </button>

            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
