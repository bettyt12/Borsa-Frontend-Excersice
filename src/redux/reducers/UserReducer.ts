import { ActionTypes } from '../actions/UserActions';

const initialState = {
  userData: null,
  loading: false,
  error: null,
  users: [], 
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_USER_SUCCESS:
    case ActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: null,
      };
    case ActionTypes.REGISTER_USER_REQUEST:
    case ActionTypes.LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.REGISTER_USER_FAILURE:
    case ActionTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.FETCH_USERS_SUCCESS: 
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case ActionTypes.FETCH_USERS_REQUEST: 
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.FETCH_USERS_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case ActionTypes.EDIT_PROFILE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case ActionTypes.EDIT_PROFILE_SUCCESS:
        return {
          ...state,
          userData: action.payload,
          loading: false,
          error: null,
        };
      case ActionTypes.EDIT_PROFILE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
};

export default userReducer;
