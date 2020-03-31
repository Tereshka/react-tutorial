import React, {useState} from 'react';
import Board from './Board';

import {calculateWinner} from '../helpers';

const mainStyle = {
  display: 'flex',
};

const styles = {
  width: '200px',
  margin: '20px auto',
};

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);

  const labelText = winner ? 'Winner: ' + winner : 'Next Player ' + (xIsNext ? 'X' : 'O');

  const handleClick = i => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];

    if (winner || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXisNext(prevX => !prevX);
  };

  const jumpTo = step => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () => (
    history.map((_step, move) => {
      const destination = move ? `Go to move#${move}` : 'Go to start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      )
    })
  );

  const restartGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXisNext(true);
  };

  return (<div style={mainStyle}>
    <Board squares={history[stepNumber]} handleClick={handleClick} />
    <div style={styles}>
      <p>{labelText}</p>
      <button onClick={restartGame}>Restart Game</button>
      {renderMoves()}
    </div>
  </div>);
};

export default Game;