import * as types from '../actionTypes/currentUserTypes';
import { SHOW_SOCIAL_AUTH, HIDE_SOCIAL_AUTH } from '../actionTypes/socialAuth';
import server from '../Api/server';

export const setIsAuth = () => ({
  type: types.SET_IS_AUTH,
  payload: true,
});

export const setCurrentUser = (user) => ({
  type: types.SET_CURRENT_USER,
  payload: user,
});

export const showSocialAuth = () => ({
  type: SHOW_SOCIAL_AUTH,
});

export const hideSocialAuth = () => ({
  type: HIDE_SOCIAL_AUTH,
});

export const handleShowAndHide = (show) => (dispatch) => {
  if (show) dispatch(showSocialAuth());
  if (!show) dispatch(hideSocialAuth());
};

export const getUserDetails = (username, isCurrentUsersProfile) => async (dispatch) => {
  try {
    const {
      data: { profile },
    } = await server.get(`/profiles/${username}`);
    dispatch({
      type: types.GET_USER_DETAILS,
      payload: {
        profile,
        isCurrentUsersProfile,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_USER_DETAILS_ERROR,
      payload: error,
    });
  }
};

/**
 * Login the user
 * @param {*} { username, email, password }
 * @return {object} response
 */
export default (token, user) => (dispatch) => {
  localStorage.setItem('token', token);
  dispatch(setIsAuth());
  dispatch(setCurrentUser(user));
  localStorage.setItem('username', user.username);
  return Promise.resolve(true);
};
