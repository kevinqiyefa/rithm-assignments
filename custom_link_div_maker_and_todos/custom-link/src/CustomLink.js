import React, { Component } from 'react';

class CustomLink extends Component {
  render() {
    return (
      <div className="CustomLink">
        <a
          onClick={this.props.openLink}
          href={this.props.href}
          target={this.props.target}
        >
          {this.props.text}
        </a>
      </div>
    );
  }
}

export default CustomLink;
