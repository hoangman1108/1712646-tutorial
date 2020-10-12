import React, { Component } from 'react'

export default class Square extends Component {
      render() {
        if (!this.props.outline) {
          return (
          
            <button className='btn btn-outline-dark btn-ne'
              onClick={() => this.props.onClick()}
              {...this.props}
            >
              {this.props.value }
            </button>
          );
        }
        return (
          
          <button className='btn btn-outline-danger btn-ne'
            onClick={() => this.props.onClick()}
            {...this.props}
          >
            {this.props.value }
          </button>
        );
      }
}
