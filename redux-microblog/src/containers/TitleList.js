import React, { Component } from 'react';
import Title from '../components/Title';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';
import '../assets/TitleList.css';

class TitleList extends Component {
  handleDelete = id => {
    this.props.dispatch({ type: 'DELETE_POST', id });
  };
  render() {
    const titles = this.props.posts.map(post => (
      <Title
        title={post.title}
        deletePost={() => this.handleDelete(post.id)}
        key={uuid()}
      />
    ));
    return (
      <div className="title-list container">
        {this.props.posts.length ? (
          <h2 className="pb-3 mb-4 font-italic border-bottom text-left">
            Titles
          </h2>
        ) : (
          ''
        )}
        <ul className="list-group">{titles}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps)(TitleList);
