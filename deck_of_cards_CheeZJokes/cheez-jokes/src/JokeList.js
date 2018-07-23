import React, { Component } from 'react';
import Joke from './Joke';

class JokeList extends Component {
  render() {
    const sortedList = this.props.jokes_list.sort(
      (a, b) => b.upvote - a.upvote
    );
    const Joke_list = sortedList.map(a => (
      <Joke
        className="Jokes"
        key={a.id}
        joke={a.joke}
        like={a.upvote}
        dislike={a.downvote}
        upvote={() => this.props.upVote(a.id)}
        downvote={() => this.props.downVote(a.id)}
      />
    ));

    return (
      <div className="JokeList">
        <ol>{Joke_list}</ol>
      </div>
    );
  }
}

export default JokeList;
