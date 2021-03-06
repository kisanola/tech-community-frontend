import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { getFeed } from '../../actions/feedActions';
import feedReducer from '../../reducers/feed';
import { SET_FEED, TOOGLE_LOADING } from '../../actionTypes/feed';
import {
  Feed,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Feed/Feed';
import feedMocks from '../../__mocks__/feedMocks';
import initialState from '../../store/initialState';

const mockStore = configureMockStore([thunk]);

describe('Feed', () => {
  let wrapper;
  let store;
  const props = {
    onGetFeed: jest.fn(),
    push: jest.fn(),
    feed: [feedMocks],
    loading: false,
    limit: 2,
    location: { search: { category: 'question' } },
  };

  describe('Feed.jsx', () => {
    beforeEach(() => {
      store = mockStore({ ...initialState });
      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Feed {...props} />
          </Router>
          ,
        </Provider>,
      );

      moxios.install(axios);
    });

    test('should render Feed.jsx', () => {
      wrapper = shallow(<Feed {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('State', () => {
    let mapped; let
      dispatch;
    beforeEach(() => {
      dispatch = jest.fn();
      mapped = mapDispatchToProps(dispatch);
    });

    test('should return `mapStateToProps`', () => {
      const expectedState = {
        feed: [feedMocks],
        loading: false,
        limit: 2,
      };
      const state = mapStateToProps({
        feed: { items: [feedMocks], loading: false, limit: 2 },
      });
      expect(state).toEqual(expectedState);
    });

    it('Should call onGetFeed', () => {
      mapped.onGetFeed(2, 0);
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('Feed reducer', () => {
    test('should test the reducer with type SET_FEED', () => {
      const state = feedReducer(
        { items: [] },
        { type: SET_FEED, payload: [feedMocks] },
      );
      expect(state.items).toEqual([feedMocks]);
    });

    test('should test the reducer with type TOOGLE_LOADING', () => {
      const state = feedReducer({}, { type: TOOGLE_LOADING, payload: true });
      expect(state.loading).toBe(true);
    });
  });

  describe('Login actions', () => {
    let axiosInstance;

    beforeEach(() => {
      store = mockStore({});
      axiosInstance = axios;
      moxios.install(axiosInstance);
    });

    afterEach(() => {
      moxios.uninstall(axios);
    });

    test('Should call the `getFeed` action with success', () => {
      moxios.stubRequest(
        `${process.env.REACT_APP_BACKEND_URL}/feed?offset=0&&limit=10`,
        {
          status: 200,
          response: {
            data: {
              feed: [feedMocks],
            },
          },
        },
      );

      store.dispatch(getFeed(0, 0)).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });

    test('Should call the `getFeed` action with error', () => {
      moxios.stubRequest(
        `${process.env.REACT_APP_BACKEND_URL}/feed?offset=0&&limit=10`,
        {
          status: 500,
          response: {},
        },
      );

      store.dispatch(getFeed(0, 0)).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  });
});
