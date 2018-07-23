import React, { Component } from 'react';

class Box extends Component {
  render() {
    const colors = {
      width: this.props.width,
      height: this.props.height,
      backgroundColor: this.props.bgc
    };

    return (
      <div className="Box">
        <div style={colors} />
        <button onClick={this.props.removeBox}>Delete!</button>
      </div>
    );
  }
}

export default Box;
