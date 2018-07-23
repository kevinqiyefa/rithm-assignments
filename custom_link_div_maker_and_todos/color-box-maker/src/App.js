import React, { Component } from 'react';

import './App.css';
import BoxList from './BoxList';
import NewBoxForm from './NewBoxForm';

class App extends Component {
  state = { boxes: [] };

  handleCreateBox = newBox => {
    this.setState({ boxes: this.state.boxes.concat(newBox) });
  };

  handleRemoveBox = id => {
    this.setState({ boxes: this.state.boxes.filter(b => b.id !== id) });
  };

  render() {
    return (
      <div className="App">
        <BoxList boxes={this.state.boxes} deleteBox={this.handleRemoveBox} />
        <NewBoxForm createBox={this.handleCreateBox} />
      </div>
    );
  }
}

export default App;
