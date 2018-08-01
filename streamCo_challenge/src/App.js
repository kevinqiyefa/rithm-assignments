import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Series from './Series';
import Movies from './Movies';
import Errors from './Errors';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="main-content">
          <Switch>
            <Route exact path="/" component={() => <Home title="Titles" />} />
            <Route
              exact
              path="/series"
              component={() => <Series programType="series" title="Series" />}
            />
            <Route
              exact
              path="/movies"
              component={() => <Movies programType="movie" title="Movies" />}
            />
            <Route path="/" component={() => <Errors title="Titles" />} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
