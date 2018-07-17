class Person extends React.Component {
  render() {
    const { name, age, hobbies } = this.props;
    const vote = age >= 18 ? 'please go vote!' : 'you must be 18';
    const n = name.length > 8 ? name.slice(0, 6) : name;

    return (
      <div>
        <h3>{n}</h3>
        <p>Learn some information about this person</p>
        <h3>{vote}</h3>
        <h3>hobbies:</h3>
        <ul>{hobbies.map(h => <li key={h}>{h}</li>)}</ul>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Person name="kevin1" age={17} hobbies={['coding', 'reading']} />
    <Person name="kevin2" age={18} hobbies={['coding', 'reading']} />
    <Person name="kevin3" age={19} hobbies={['coding', 'reading']} />
  </div>,
  document.getElementById('root')
);
