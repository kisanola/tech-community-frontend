import React, { Component } from 'react';
import './Home.scss';
import Layout from '../../containers/Layout/Layout';
import Post from '../../components/Post/Post';
import Feed from '../../components/Feed/Feed';

export class Home extends Component {
  render() {
    const {
      match,
      location,
      history: { push },
    } = this.props;
    return (
      <Layout match={match} location={location}>
        <div className="container-fluid">
          <div className="row">
            <Post />
            <Feed push={push} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
