import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Home from './Home';
import New from './New';
import Color from './Color';
// import Login from './Login';

// export const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/login',
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );

class App extends Component {
  state = {
    colors: [
      { color: 'blue', code: '#0000FF' },
      { color: 'red', code: '#FF0000' },
      { color: 'yellow', code: '#FFFF00' }
    ]
  };

  addColor = (cl, cd) => {
    this.setState({ colors: [{ color: cl, code: cd }, ...this.state.colors] });
  };
  render() {
    const color_list = this.state.colors.map((c, idx) => (
      <Route
        key={idx}
        exact
        path={`/colors/${c.color}`}
        component={() => <Color cl={c.color} cd={c.code} />}
      />
    ));
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/colors"
            component={() => <Home cls={this.state.colors} />}
          />
          <Route
            exact
            path="/colors/new"
            component={props => <New {...props} addCl={this.addColor} />}
          />

          {/* <PrivateRoute
            path="/colors/new"
            component={props => <New {...props} addCl={this.addColor} />}
          /> */}

          {color_list}

          {/* <Route
            exact
            path="/login"
            component={props => <Login {...props} />}
          /> */}

          <Redirect to="/colors" />
        </Switch>
      </div>
    );
  }
}

export default App;
