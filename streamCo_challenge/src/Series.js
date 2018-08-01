import React, { Component } from 'react';
import dataFormat from './dataFormat';
import ProgramCard from './ProgramCard';
import './Series.css';

class Series extends Component {
  state = {
    message: 'Loading...',
    serieslist: []
  };

  componentDidMount = () => {
    let series = dataFormat(this.props.programType);
    setTimeout(() => {
      this.setState({ serieslist: series, message: '' });
    }, 1000);
  };

  render() {
    if (this.state.message) {
      return <h3 className="mt-5">{this.state.message}</h3>;
    }

    const seriesCard = this.state.serieslist.map((s, idx) => (
      <ProgramCard key={idx} title={s.title} url={s.images['Poster Art'].url} />
    ));

    return (
      <div>
        <nav className="navbar sec-nav">
          <div className="container text-white header-content">{`Popular ${
            this.props.title
          }`}</div>
        </nav>
        <div className="content">
          <div className="series ">{seriesCard}</div>
        </div>
      </div>
    );
  }
}

export default Series;
