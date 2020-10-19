import React from 'react';
import Square from './Square';

export default function Board(props) {
  const renderSquare = (i) => {
    let ioutline = false;
    if (props.lines.includes(i)) {
      ioutline = true;
    }
    return (
      <Square
        value={props.squares[i]}
        outline={ioutline}
        onClick={() => props.onClick(i)}
      />
    );
  };

  return (
    <div className="mt-4">
      {(() => {
        const options = [];
        for (let i = 0; i < 3; i++) {
          options.push(<br></br>);
          for (let k = 0; k < 3; k++) {
            options.push(renderSquare(i * 3 + k));
          }
        }
        return options;
      })()}
    </div>
  );
}
