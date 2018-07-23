import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './App.css';

class App extends Component {
  state = {
    images: [],
    showimages: []
  };
  displayCards = () => {
    let cards = this.state.images.slice();
    let randomimage = cards.pop();

    this.setState({
      images: cards,
      showimages: [...this.state.showimages, randomimage]
    });
  };
  async componentDidMount() {
    try {
      let img = [];
      const response = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/draw/?count=52'
      );

      response.data.cards.forEach(card => img.push(card.image));

      this.setState({
        images: img
      });
    } catch (e) {
      alert('Opps, something went wrong');
    }
  }
  render() {
    const cards = this.state.showimages.map((i, idx) => (
      <Card key={idx} src={i} />
    ));
    return (
      <div className="App">
        <div>
          <a className="action-button animate blue" onClick={this.displayCards}>
            Gimme a Card!
          </a>
        </div>
        <ul>{cards}</ul>
      </div>
    );
  }
}

export default App;
