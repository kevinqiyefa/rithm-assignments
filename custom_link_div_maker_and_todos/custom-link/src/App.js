import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomLink from './CustomLink';
class App extends Component {
  state = { isDisable: false, target: '_self' };

  toggleDisableLink = () => {
    this.setState({ isDisable: !this.state.isDisable });
  };

  openLink = e => {
    if (this.state.isDisable) {
      e.preventDefault();
    }
    this.setState({ target: '_blank' });
  };

  render() {
    const links = [
      { href: 'https://www.rithmschool.com', text: 'Rithm School' },
      { href: 'https://facebook.github.io/react/', text: 'React Docs' },
      { href: 'https://www.codewars.com/dashboard', text: 'CodeWars' }
    ];

    return (
      <div className="App">
        {links.map((m, index) => (
          <CustomLink
            href={m.href}
            text={m.text}
            key={index}
            openLink={this.openLink}
            target={this.state.target}
          />
        ))}
        <button onClick={this.toggleDisableLink}> Disable Link</button>
      </div>
    );
  }
}

export default App;
