import React, { Component } from 'react'
import Square from './Square'


export default class Board extends Component {
  constructor(props) {
    super(props);
  }


  renderSquare(i) {
    let ioutline = false;
    if (this.props.lines[0] === i || this.props.lines[1] === i || this.props.lines[2] === i) {
      ioutline = true;
    }
    return (
      <Square
        value={this.props.squares[i]}
        outline = {ioutline}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

 
  render() {
     return (
      <div className="mt-4">
         {(() => {
          const options = [];
          for (let i = 0; i < 3; i++) {
            options.push(<br></br>);
            for (let k = 0; k < 3; k++) {
              options.push(this.renderSquare(i*3 + k));
            }
          }
          return options;
        })()}
      </div>
    );
  }
}
