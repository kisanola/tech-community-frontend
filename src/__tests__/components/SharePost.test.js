import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import SharePost, {
  SharePost as SharePostComponent,
} from '../../components/SharePost/SharePost';

describe('SharePost', () => {
  const props = {
    show: true,
    handleClose: jest.fn(),
    _sharePost: jest.fn(),
  };

  const mockStore = configureMockStore([thunk]);
  const store = mockStore({});

  it('should render `SharePost`', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SharePost {...props} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should share to a platform', () => {
    const wrapper = mount(<SharePostComponent {...props} />);
    wrapper.find('#twitter').simulate('click');
    expect(wrapper.props()._sharePost).toHaveBeenCalled();
  });
});
