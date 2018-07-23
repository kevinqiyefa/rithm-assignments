import React, { Component } from 'react';
import './App.css';
import NewTodoForm from './NewTodoForm';
import TodoList from './TodoList';

class App extends Component {
  state = { todoList: [] };

  createTask = task => {
    this.setState({ todoList: this.state.todoList.concat(task) });
  };

  removeTask = id => {
    this.setState({
      todoList: this.state.todoList.filter(task => task.id !== id)
    });
  };

  toggleEditing = (id, isEditing) => {
    this.setState({
      todoList: this.state.todoList.map(t => {
        if (t.id === id) t.isEditing = isEditing;
        return t;
      })
    });
  };

  toggleComplete = (id, isCheck) => {
    this.setState({
      todoList: this.state.todoList.map(t => {
        if (t.id === id) t.isComplete = isCheck;
        return t;
      })
    });
  };

  editTask = (id, task) => {
    this.setState({
      todoList: this.state.todoList.map(t => {
        if (t.id === id) t.task = task;
        return t;
      })
    });
  };

  render() {
    return (
      <div className="App">
        <NewTodoForm createTask={this.createTask} />
        <TodoList
          todoList={this.state.todoList}
          removeTask={this.removeTask}
          toggleEditing={this.toggleEditing}
          editTask={this.editTask}
          toggleChecked={this.toggleComplete}
        />
      </div>
    );
  }
}

export default App;
