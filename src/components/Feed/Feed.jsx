import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import './Feed.scss';
import TimeAgo from '../Helpers/TimeAgo';
import { getFeed } from '../../actions/feedActions';
import resolvePlaceholder from '../../helpers/resolvePlaceHolder';
import ContentLoader from '../Helpers/ContentLoader';
import onScrollToBottom from '../../helpers/onScrollToBottom';
import Like from '../../components/Like/Like';

export class Feed extends Component {
  constructor(props) {
    super(props);

    window.onscroll = debounce(() => {
      onScrollToBottom(() => this.handleInfiniteScroll());
    });
  }

  componentDidMount() {
    const { onGetFeed, limit } = this.props;
    onGetFeed(limit, 0);
  }

  handleInfiniteScroll() {
    const { onGetFeed, feed = [], limit } = this.props;
    if (feed.length < 1) return;
    onGetFeed(limit, feed.length);
  }

  render() {
    const { feed = [], loading, push } = this.props;

    return (
      <React.Fragment>
        <div className="feed">
          {feed.map(
            (
              {
                author: { username, picture: profilePicture },
                userType,
                image: postImage,
                description,
                likesCount,
                createdAt,
                liked,
                slug,
              },
              index,
            ) => (
              <div
                className="post"
                key={index}
                onClick={() => push(`/post/${slug}`)}
              >
                <div className="header">
                  <div className="right">
                    <img
                      className="image"
                      src={resolvePlaceholder(profilePicture, userType)}
                      alt="placeholder"
                    />

                    <div className="info">
                      <span
                        className="name"
                        onClick={() => push(`/profile/${username}`)}
                      >
                        {username}
                      </span>
                      <span className="label">{userType}</span>
                    </div>
                  </div>

                  <div className="date">
                    <TimeAgo date={createdAt} />
                  </div>
                </div>

                {postImage && (
                  <img src={postImage} alt="" className="post-image" />
                )}

                <div className="body">{description}</div>

                <div className="category">Web design</div>

                <div className="bottom">
                  <div className="left">
                    <Like {...{ slug, likesCount, liked }} />

                    <div className="action">
                      <i className="far fa-comment-alt"></i>
                      <span className="count">12</span>
                    </div>
                  </div>

                  <div className="action share">
                    <i className="fas fa-share-alt"></i>
                  </div>
                </div>
              </div>
            ),
          )}

          {loading &&
            [...Array(feed.length > 1 ? 1 : 3)].map((value, index) => (
              <ContentLoader key={index} />
            ))}
        </div>
      </React.Fragment>
    );
  }
}

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({ feed: { items: feed, loading, limit } }) => {
  return { feed, loading, limit };
};

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => ({
  onGetFeed: (limit, itemsLength) => dispatch(getFeed(limit, itemsLength)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);
