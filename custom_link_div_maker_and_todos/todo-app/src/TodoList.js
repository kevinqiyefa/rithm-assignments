import React, { Component } from 'react';
import Todo from './Todo';
import EditableTodo from './EditableTodo';
import './TodoList.css';

class TodoList extends Component {
  render() {
    const list = this.props.todoList.map(
      t =>
        !t.isEditing ? (
          <Todo
            key={t.id}
            id={t.id}
            task={t.task}
            isComplete={t.isComplete}
            toggleEdit={() => this.props.toggleEditing(t.id, true)}
            toggleComplete={isChecked =>
              this.props.toggleChecked(t.id, isChecked)
            }
            removeTask={() => this.props.removeTask(t.id)}
          />
        ) : (
          <EditableTodo
            key={t.id}
            task={t.task}
            toggleEdit={() => this.props.toggleEditing(t.id, false)}
            editTodo={obj => this.props.editTask(t.id, obj)}
            removeTask={() => this.props.removeTask(t.id)}
          />
        )
    );

    return (
      <div className="TodoList">
        <ul className="list">{list}</ul>
      </div>
    );
  }
}

export default TodoList;
