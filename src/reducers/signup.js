import initialState from '../store/initialState';
import {
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_STARTED,
  SIGNUP_INPUT_CHANGED,
} from '../actionTypes/signupTypes';

/**
 * Signup reducer
 * @param {*} [state=auth]
 * @param {*} { type, payload }
 * @returns {object} updated state
 */
const signupReducer = (state = initialState.auth, { type, payload }) => {
  switch (type) {
    case SIGNUP_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: false,
        loggedIn: true,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        loggedIn: false,
      };
    case SIGNUP_INPUT_CHANGED:
      return {
        ...state,
        user: {
          ...state.user,
          [payload.name]: payload.value,
        },
      };
    default:
      return state;
  }
};

export default signupReducer;
