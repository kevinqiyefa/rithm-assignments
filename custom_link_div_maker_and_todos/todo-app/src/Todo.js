import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  state = { isChecked: this.props.isComplete };

  check() {
    this.props.toggleComplete(!this.state.isChecked);
    this.setState({
      isChecked: !this.state.isChecked
    });
  }

  render() {
    // const style = { display: 'inline-flex', margin: '0 3em 0 0' };
    return (
      <li className="list-item">
        <div className="Todo">
          <input
            type="checkbox"
            className="hidden-box"
            id={this.props.id}
            checked={this.state.isChecked}
            onClick={() => this.check()}
          />
          <label htmlFor={this.props.id} className="check--label">
            <span className="check--label-box" />
            <span className="check--label-text">{this.props.task}</span>
          </label>

          <button className="edit" onClick={this.props.toggleEdit}>
            Edit
          </button>
          <button className="delete" onClick={this.props.removeTask}>
            X
          </button>
        </div>
      </li>
    );
  }
}

export default Todo;
