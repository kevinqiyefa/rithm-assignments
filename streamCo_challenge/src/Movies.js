import React, { Component } from 'react';
import dataFormat from './dataFormat';
import ProgramCard from './ProgramCard';
import './Movies.css';

class Movies extends Component {
  state = {
    message: 'Loading...',
    movielist: []
  };

  componentDidMount = () => {
    let movie = dataFormat(this.props.programType);
    setTimeout(() => {
      this.setState({ movielist: movie, message: '' });
    }, 1000);
  };

  render() {
    if (this.state.message) {
      return <h3 className="mt-5">{this.state.message}</h3>;
    }
    const movieCard = this.state.movielist.map((s, idx) => (
      <ProgramCard key={idx} title={s.title} url={s.images['Poster Art'].url} />
    ));

    return (
      <div className="movie-main">
        <nav className="navbar sec-nav">
          <div className="container text-white header-content">{`Popular ${
            this.props.title
          }`}</div>
        </nav>
        <div className="content">
          <div className="movies"> {movieCard}</div>
        </div>
      </div>
    );
  }
}

export default Movies;
