import React, { Component } from 'react';
import './EditableTodo.css';

class Editable extends Component {
  state = { editTask: this.props.task };

  collectInput = e => {
    e.preventDefault();
    this.props.toggleEdit();
    this.props.editTodo(this.state.editTask);
  };

  handleInputChange = e => {
    this.setState({ editTask: e.target.value });
  };

  render() {
    return (
      <div className="Editable">
        <form onSubmit={this.collectInput}>
          <div className="edit-task">
            <input
              className="edit-input"
              type="text"
              id="task"
              value={this.state.editTask}
              onChange={this.handleInputChange}
            />
            <button className="edit-save">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Editable;
