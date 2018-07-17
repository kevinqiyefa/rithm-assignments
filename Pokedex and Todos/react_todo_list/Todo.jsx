class Todo extends React.Component {
  render() {
    const { task } = this.props;

    return (
      <div className="list">
        <h3>Task: {task}</h3>
      </div>
    );
  }
}
