import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import './App.css';
import W from './Whiskey.png';
import H from './Hazel.png';
import T from './Tubby.png';

const Dogs = ({ match, location }) => {
  const dogs = ['whiskey', 'hazel', 'tubby'];
  if (dogs.includes(match.params.name)) {
    return (
      <div>
        <div>
          <h1>Name: {location.state.name}</h1>
          <h3>age: {location.state.age}</h3>
          {location.state.facts.map((f, idx) => <h3 key={idx}>{f}</h3>)}
        </div>
      </div>
    );
  } else if (!match.params.name) {
    return <div />;
  }
  return <Redirect to="/dogs" />;
};

// const Whiskey = props => {
//   return (
//     <div>
//       <h1>Name: Whiskey</h1>
//       <h3>age: 4</h3>
//       <h3>Whiskey loves eating popcorn.</h3>
//       <h3>Whiskey is a terrible guard dog.</h3>
//       <h3>Whiskey wants to cuddle with you!</h3>
//     </div>
//   );
// };

// const Hazel = props => {
//   return (
//     <div>
//       <h1>Name: Hazel</h1>
//       <h3>age: 0</h3>
//       <h3>Hazel has a lot of energy.</h3>
//       <h3>Hazel is highly intelligent.</h3>
//       <h3>Hazel loves people more than dogs!</h3>
//     </div>
//   );
// };

// const Tubby = props => {
//   return (
//     <div>
//       <h1>Name: Tubby</h1>
//       <h3>age: 4</h3>
//       <h3>Tubby is really stupid.</h3>
//       <h3>Tubby does not like walks.</h3>
//       <h3>Angelina hates Tubby!</h3>
//     </div>
//   );
// };

class App extends Component {
  state = {
    Whiskey: {
      isActive: true,
      name: 'Whiskey',
      age: 4,
      facts: [
        'Whiskey loves eating popcorn',
        'Whiskey is a terrible guard dog.',
        'Whiskey wants to cuddle with you!'
      ]
    },
    Hazel: {
      isActive: true,
      name: 'Hazel',
      age: 0,
      facts: [
        'Hazel has a lot of energy.',
        'Hazel is highly intelligent.',
        'Hazel loves people more than dogs!'
      ]
    },
    Tubby: {
      isActive: true,
      name: 'Tubby',
      age: 4,
      facts: [
        'Tubby is really stupid.',
        'Tubby does not like walks.',
        'Angelina hates Tubby!'
      ]
    },
    lol: 0
  };

  // viewInfo = () => {
  //   this.setState({
  //     lol: this.state.lol + 1
  //   });
  // };
  render() {
    return (
      <div className="App">
        <h1>Hello, We have dogs; click on them for more info.</h1>
        <div className="list-of-dog">
          <div className="list">
            <img src={W} alt="" />
            <div className="dog-name">
              <Link
                to={{ pathname: '/dogs/whiskey', state: this.state.Whiskey }}
              >
                Whiskey
              </Link>
            </div>
          </div>
          <div className="list">
            <img src={H} alt="" />
            <div className="dog-name">
              <Link to={{ pathname: '/dogs/hazel', state: this.state.Hazel }}>
                Hazel
              </Link>
            </div>
          </div>
          <div className="list">
            <img src={T} alt="" />
            <div className="dog-name">
              <Link to={{ pathname: '/dogs/tubby', state: this.state.Tubby }}>
                Tubby
              </Link>
            </div>
          </div>
        </div>
        <Switch>
          <Route exact path="/dogs" component={Dogs} />
          <Route exact path="/dogs/:name" component={Dogs} />
          <Redirect to="/dogs" />
        </Switch>
      </div>
    );
  }
}

export default App;
