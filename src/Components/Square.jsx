import React, { Component } from 'react'

export default class Square extends Component {
      render() {
        return (
          <button className='btn btn-outline-dark btn-ne'
            onClick={() => this.props.onClick()}
            {...this.props}
          >
            {this.props.value }
          </button>
        );
      }
}
