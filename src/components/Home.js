import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from 'contentful';

const SPACE_ID = 'd2po5dvsb8lj'
const ACCESS_TOKEN = '08fd33f2eae21ecb8e76fa2c5d323a250fbd909f10de0a008dcd5ea93c2af476'

class Home extends Component {
  state = {
    posts: []
  };

  componentWillMount(){
    const client = createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN
    });

    client
      .getEntries({})
      .then(res => {
        this.setState({
          posts: res.items
        });
      })
      .catch(console.error);
  }


  render() {
    if(!this.state.posts.length) return <p>No posts found.</p>;
    return this.state.posts.map((post, i) => {
        console.log(post);
        return (
          <div className="container">
          <Link key={post.sys.id} to={`post/${post.sys.id}/`}>{post.fields.title}</Link>
          </div>
        );
    });
  }
}

export default Home;
