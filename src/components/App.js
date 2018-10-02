import React, { Component } from "react";

import "./App.css";

import axios from "axios";
import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount is requesting HTTP");
    axios.get("https://practiceapi.devmountain.com/api/posts").then(results => {
      this.setState({ posts: results.data });
    });
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  createPost(text) {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, { text })
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  render() {
    const { posts } = this.state;
    console.log(posts);
    let displayPosts = posts.map((val, key) => {
      return (
        <Post
          key={key}
          text={val.text}
          date={val.date}
          updatePostFn={this.updatePost}
          id={val.id}
          deletePost={this.deletePost}
        />
      );
    });

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {displayPosts}
        </section>
      </div>
    );
  }
}

export default App;
