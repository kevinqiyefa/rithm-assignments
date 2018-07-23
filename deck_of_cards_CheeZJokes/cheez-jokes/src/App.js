import React, { Component } from 'react';
import axios from 'axios';
import JokeList from './JokeList';
import uuidv1 from 'uuid/v1';
import './App.css';

class App extends Component {
  state = {
    jokes: [],
    message: 'Loading....'
  };

  async componentDidMount() {
    try {
      let list = [];
      let unique = new Set();

      while (unique.size < 20) {
        const response = await axios.get(`https://icanhazdadjoke.com/`, {
          headers: { Accept: 'application/json' }
        });
        unique.add(response.data.joke);
      }
      [...unique].forEach(j => {
        list.push({ id: uuidv1(), joke: j, upvote: 0, downvote: 0 });
      });

      this.setState({
        jokes: list,
        message: ''
      });
    } catch (e) {
      alert('Opps somthing went wrong!');
    }
  }

  refreshJokes = () => {
    this.setState({
      jokes: [],
      message: 'Loading....'
    });
    this.componentDidMount();
  };

  addUpVote = id => {
    this.setState({
      jokes: this.state.jokes.map(j => {
        if (id === j.id) ++j.upvote;
        return j;
      })
    });
  };
  addDownVote = id => {
    this.setState({
      jokes: this.state.jokes.map(j => {
        if (id === j.id) ++j.downvote;
        return j;
      })
    });
  };

  render() {
    return (
      <div className="App">
        {!this.state.message ? (
          <div>
            <div className="App-Button">
              <button className="refresh" onClick={this.refreshJokes}>
                Click Me to Refresh!
              </button>
            </div>
            <JokeList
              jokes_list={this.state.jokes}
              upVote={this.addUpVote}
              downVote={this.addDownVote}
            />
          </div>
        ) : (
          <p>{this.state.message}</p>
        )}
      </div>
    );
  }
}

export default App;
