class Tweet extends React.Component {
  render() {
    const { username, name, date, message } = this.props;
    const colors = {
      color: 'blue',
      backgroundColor: 'yellow'
    };

    return (
      <div style={colors}>
        <p>username: {username}</p>
        <p>name: {name}</p>
        <p>date: {date}</p>
        <p>message: {message}</p>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <Tweet username="kevin" name="kev" date="today" message="hello1" />
          <hr />
          <Tweet username="kevin" name="kev" date="today" message="hello2" />
          <hr />
          <Tweet username="kevin" name="kev" date="today" message="hello3" />
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root')
);
