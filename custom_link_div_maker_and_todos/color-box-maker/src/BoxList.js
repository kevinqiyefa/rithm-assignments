import React, { Component } from 'react';
import Box from './Box';

class BoxList extends Component {
  render() {
    const boxes = this.props.boxes.map(b => (
      <Box
        key={b.id}
        width={b.width}
        height={b.height}
        bgc={b.backgroundColor}
        removeBox={() => this.props.deleteBox(b.id)}
      />
    ));
    return <div className="BoxList">{boxes}</div>;
  }
}

export default BoxList;
