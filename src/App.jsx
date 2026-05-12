import { useState } from "react";
import "./index.css";
import "./popup.css";

function Header() {
  return (
    <header className="header">
      <h1 className="title">
        Tic<span className="accent">-</span>Tac<span className="accent">-</span>
        Toe
      </h1>
    </header>
  );
}

function ScoreBoard() {
  return (
    <div className="scoreboard">
      <div className="score-card" id="score-x">
        <span className="score-symbol x">
          <i className="fa-solid fa-x"></i>
        </span>
        <span className="score-label">Pemain X</span>
        <span className="score-num x" id="score-x-num">
          0
        </span>
      </div>
      <div className="score-card draw">
        <span className="score-symbol d">
          <i className="fa-solid fa-minus"></i>
        </span>
        <span className="score-label">Seri</span>
        <span className="score-num " id="score-draw-num">
          0
        </span>
      </div>
      <div className="score-card" id="score-o">
        <span className="score-symbol o">
          <i className="fa-regular fa-circle"></i>
        </span>
        <span className="score-label">Pemain O</span>
        <span className="score-num o" id="score-o-num">
          0
        </span>
      </div>
    </div>
  );
}

function Squares({ value, onSquareClick }) {
  const renderIcon = () => {
    if (value === "X") return <i className="fa-solid fa-x"></i>;
    if (value === "O") return <i className="fa-regular fa-circle"></i>;
    return null;
  };
  return (
    <div className="cell" onClick={onSquareClick}>
      {renderIcon()}
    </div>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function playAgain() {
    setSquares(Array(9).fill(null));
  }

  const winner = calculateWinner(squares);

  const drawPopUp = () => {
    //Variabel Check NUll
    const isFull = squares.every((item) => item !== null);

    if (isFull && !winner)
      return (
        <div className="popup-overlay show" id="popup-draw">
          <div className="popup-card draw">
            <div className="popup-icon draw">
              <i className="fa-solid fa-minus"></i>
            </div>
            <h2 className="popup-title">Seri!</h2>
            <p className="popup-sub">Tidak ada yang menang kali ini.</p>
            <button className="popup-btn draw" id="popup-btn-draw">
              <i className="fa-solid fa-arrow-rotate-left"></i>
              Main Lagi
            </button>
          </div>
        </div>
      );

    return false;
  };

  const winnerPopUp = () => {
    if (winner === "X")
      return (
        <div className="popup-overlay show" id="popup-x">
          <div className="popup-card x">
            <div className="popup-icon x">
              <i className="fa-solid fa-x"></i>
            </div>
            <h2 className="popup-title">Pemain X Menang!</h2>
            <p className="popup-sub">Selamat, X berhasil mengalahkan lawan!</p>
            <button
              className="popup-btn x"
              id="popup-btn-x"
              onClick={playAgain}
            >
              <i className="fa-solid fa-arrow-rotate-left"></i>
              Main Lagi
            </button>
          </div>
        </div>
      );

    if (winner === "O")
      return (
        <div className="popup-overlay show" id="popup-o">
          <div className="popup-card o">
            <div className="popup-icon o">
              <i className="fa-regular fa-circle"></i>
            </div>
            <h2 className="popup-title">Pemain O Menang!</h2>
            <p className="popup-sub">Selamat, O berhasil mengalahkan lawan!</p>
            <button className="popup-btn o" id="popup-btn-o">
              <i className="fa-solid fa-arrow-rotate-left"></i>
              Main Lagi
            </button>
          </div>
        </div>
      );
    return false;
  };
  return (
    <>
      <div className="status-bar">
        <span className={`status-text ${xIsNext ? "x" : "o"}`} id="status-text">
          {xIsNext ? "Giliran Pemain X" : "Giliran Pemain O"}
        </span>
      </div>
      {winner ? winnerPopUp() : drawPopUp()}
      <div className="board" id="board">
        {squares.map((item, index) => {
          return (
            <Squares
              value={item}
              key={index}
              onSquareClick={() => handleClick(index)}
            />
          );
        })}
      </div>
      <button className="btn-reset" id="btn-reset" onClick={playAgain}>
        <i class="fa-solid fa-arrow-rotate-left"></i>
        Main Lagi
      </button>
    </>
  );
}

export default function App() {
  return (
    <div className="wrapper">
      <Header />
      <ScoreBoard />
      <Board />
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

  return false;
}
