import React, { Component } from 'react';
import './New.css';

class New extends Component {
  state = { color: 'white', code: '#FFFFFF' };

  collectInput = e => {
    e.preventDefault();
    this.props.addCl(this.state.color, this.state.code);
    this.setState({ color: 'white', code: '#FFFFFF' });
    this.props.history.push('/colors');
  };
  handleInputChange = e => {
    this.setState({ color: e.target.value });
  };
  handleInputCodeChange = e => {
    this.setState({ code: e.target.value });
  };

  render() {
    return (
      <div className="New">
        <div className="content">
          <form onSubmit={this.collectInput}>
            <div className="fileds">
              <label htmlFor="color-name">Color Name:</label>
              <input
                className="add-input"
                type="text"
                id="color-name"
                placeholder="Enter a color"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="fileds">
              <label htmlFor="color-code">Color Name:</label>
              <input
                className="add-input"
                type="color"
                id="color-code"
                value={this.state.code}
                onChange={this.handleInputCodeChange}
              />
            </div>
            <button className="add-btn">Add Color!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default New;
