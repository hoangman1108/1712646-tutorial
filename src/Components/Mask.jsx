import React, { Component } from "react";

export default class Mask extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          background: "gray",
          opacity: 0.7,
          height: "100vh",
          width: "100vw",
          zIndex: 10,
          position: "absolute",
        }}
      >
        <div style={{ marginTop: "10vh" }}>
          <div className="game-info">
            {<img
              className="oppa"
              src="https://media.giphy.com/media/StRUIQttj1ewZVYZH2/giphy.gif"
              alt=""
              style={{
                height: "40vh",
                width: "40vw",
              }}
            /> }
            <div
              className="status"
              style={{ fontSize: "4rem", color: "white" }}
            >
              <b>{this.props.value}</b>
            </div>
          </div>

          <button
            className="btn btn-light mt-5"
            onClick={() => this.props.playAgain()}
          >
            PLAY AGAIN
          </button>

          <button
            className="btn btn-light mt-5"
            onClick={() => this.props.playAgain()}
          >
            EXIT
          </button>
        </div>
      </div>
    );
  }
}
