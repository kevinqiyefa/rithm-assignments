import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Chips from './Chips';
import bg from './vendor-machine.png';
import soda from './soda.png';
import sardines from './sardines.gif';

import './App.css';

const Home = props => {
  return (
    <div className="home">
      <img className="bg" src={bg} alt="" />
      <div className="greeting">
        <h2>Hello Im a vending machine. What would you like to eat? </h2>
      </div>
      <ul className="Nav">
        <li>
          <Link to="/soda">SODA</Link>
        </li>
        <li>
          <Link to="/chips">CHIPS</Link>
        </li>
        <li>
          {' '}
          <Link to="/sardines">FRESH SARDINES</Link>
        </li>
      </ul>
    </div>
  );
};

const Soda = props => {
  return (
    <div className="soda">
      <img className="soda-img" src={soda} alt="" />
      <div className="soda-content">
        <h1>OMG SUGARRRR</h1>
        <h1>
          <Link to="/">Go back</Link>
        </h1>
      </div>
      <img className="soda-img" src={soda} alt="" />
    </div>
  );
};

const Sardines = props => {
  return (
    <div className="Sarchines">
      <img className="sardine-img" src={sardines} alt="" />
      <div className="Sarchines-content">
        <h1>FRESH SARDINES EVERDAYYYY!</h1>
        <h1 className="sardine-btn">
          <Link to="/">Go back</Link>
        </h1>
      </div>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/soda" component={Soda} />
        <Route exact path="/chips" component={Chips} />
        <Route exact path="/sardines" component={Sardines} />
      </div>
    );
  }
}

export default App;
