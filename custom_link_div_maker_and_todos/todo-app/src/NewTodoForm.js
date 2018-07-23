import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import './NewTodoForm.css';

class NewTodoForm extends Component {
  state = { task: '' };

  collectInput = e => {
    e.preventDefault();
    if (this.state.task) {
      this.props.createTask({
        ...this.state,
        id: uuidv1(),
        isEditing: false,
        isComplete: false
      });
      this.setState({ task: '' });
    }
  };

  handleInputChange = e => {
    this.setState({ task: e.target.value });
  };

  render() {
    return (
      <div className="NewTodoForm">
        <form onSubmit={this.collectInput}>
          <div className="input-form">
            <label htmlFor="task" className="add-task-text">
              Task:
            </label>
            <input
              className="add-task-input"
              type="text"
              id="task"
              value={this.state.task}
              onChange={this.handleInputChange}
            />
            <button className="add-task">Add Task!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewTodoForm;
