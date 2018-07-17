class TodoList extends React.Component {
  render() {
    const todo = [
      { task: 'clean the room' },
      { task: 'take the trash' },
      { task: 'wash the disk' }
    ];

    return (
      <div className="todolist">
        <h1>Todo List</h1>
        <ul className="lists">
          {todo.map((p, idx) => (
            <li key={idx}>
              <Todo task={p.task} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <TodoList />
  </div>,
  document.getElementById('root')
);
