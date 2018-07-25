import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

const Operations = ({ match }) => {
  let result;
  if (match.params.operator === 'add') {
    result = Number(match.params.num1) + Number(match.params.num2);
  } else if (match.params.operator === 'subtract') {
    result = Number(match.params.num1) - Number(match.params.num2);
  } else if (match.params.operator === 'multiply') {
    result = Number(match.params.num1) * Number(match.params.num2);
  } else if (match.params.operator === 'divide') {
    result = Number(match.params.num1) / Number(match.params.num2);
  }

  return <h1>The result is {result} </h1>;
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/:operator/:num1/:num2" component={Operations} />
      </div>
    );
  }
}

export default App;
