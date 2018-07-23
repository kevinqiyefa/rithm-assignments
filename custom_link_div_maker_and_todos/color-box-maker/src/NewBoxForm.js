import React, { Component } from 'react';

import uuidv1 from 'uuid/v1';

class NewBoxForm extends Component {
  state = {
    width: '',
    height: '',
    backgroundColor: ''
  };

  collectInput = evt => {
    evt.preventDefault();

    this.props.createBox({ ...this.state, id: uuidv1() });

    this.setState({
      width: '',
      height: '',
      backgroundColor: ''
    });
  };

  handleWidthChange = evt => {
    this.setState({
      width: evt.target.value
    });
  };

  handleHeightChange = evt => {
    this.setState({
      height: evt.target.value
    });
  };

  handleColorChange = evt => {
    this.setState({
      backgroundColor: evt.target.value
    });
  };

  render() {
    return (
      <div className="NewBoxForm">
        <form onSubmit={this.collectInput}>
          <div>
            <label htmlFor="width">Width:</label>
            <input
              type="text"
              id="width"
              value={this.state.width}
              onChange={this.handleWidthChange}
            />
          </div>

          <div>
            <label htmlFor="height">height:</label>
            <input
              type="text"
              id="height"
              value={this.state.height}
              onChange={this.handleHeightChange}
            />
          </div>

          <div>
            <label htmlFor="backgroundColor">backgroundColor:</label>
            <input
              type="text"
              id="backgroundColor"
              value={this.state.backgroundColor}
              onChange={this.handleColorChange}
            />
          </div>

          <button>Submit!</button>
        </form>
      </div>
    );
  }
}

export default NewBoxForm;
