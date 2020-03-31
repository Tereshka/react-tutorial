import React from 'react';
import Square from './Square';

const style = {
  border: '4px solid darkblue',
  borderRadius: '10px',
  width: '250px',
  height: '250px',
  margin: '0 auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
};

function Board({squares, handleClick}) {

  const squaresElements = squares.map((el, i) =>
    (<Square key={i} value={el} handleClick={() => handleClick(i)} />)
  );

  return (<div style={style}>
    {squaresElements}
  </div>);
};

export default Board;