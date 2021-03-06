import React from 'react';
import './Home.scss';
import PropTypes from 'prop-types';
import Layout from '../../containers/Layout/Layout';
import Post from '../../components/Post/Post';
import Feed from '../../components/Feed/Feed';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop';

export const Home = (props) => (
  <Layout {...props}>
    <div className="container-fluid">
      <div className="row home-page">
        <div className="col-md-3">
          <HomeLeft {...props} />
        </div>
        <div className="col-md-6">
          <Post />
          <Feed {...props} />
          <ScrollToTop />
        </div>
        <div className="col-md-3 d-none d-md-block">
          <HomeRight {...props} />
        </div>

      </div>
    </div>
  </Layout>
);

Home.propTypes = {
  location: PropTypes.any,
  match: PropTypes.any,
  history: PropTypes.any,
};

Home.defaultProps = {
  location: {},
  match: {},
  history: {},
};

export default Home;
