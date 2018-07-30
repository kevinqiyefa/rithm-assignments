import React, { Component } from 'react';
import PostList from '../containers/PostList';
import NewPostForm from '../containers/NewPostForm';
import TitleList from '../containers/TitleList';
import '../assets/App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <NewPostForm />
        <div className="row">
          <div className="col-md-8 blog-main">
            <PostList />
          </div>
          <aside className="col-md-4 blog-sidebar">
            <TitleList />
          </aside>
        </div>
      </div>
    );
  }
}

export default App;
