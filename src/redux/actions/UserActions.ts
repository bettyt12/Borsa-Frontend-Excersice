export enum ActionTypes {
  REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE',
  LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST', 
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS', 
  LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE',
	FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE',
  EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST',
  EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS',
  EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE',
}

export const registerUserRequest = (userData: any) => ({
  type: ActionTypes.REGISTER_USER_REQUEST,
  payload: userData,
});

export const registerUserSuccess = (response: any) => ({
  type: ActionTypes.REGISTER_USER_SUCCESS,
  payload: response,
});

export const registerUserFailure = (error: string) => ({
  type: ActionTypes.REGISTER_USER_FAILURE,
  payload: error,
});

export const loginUserRequest = (userData: { email: string, password: string }) => ({
  type: ActionTypes.LOGIN_USER_REQUEST,
  payload: userData,
});

export const loginUserSuccess = (user: any) => ({
  type: ActionTypes.LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserFailure = (error: string) => ({
  type: ActionTypes.LOGIN_USER_FAILURE,
  payload: error,
});

export const fetchUsersRequest = (page: number, limit: number) => ({
  type: ActionTypes.FETCH_USERS_REQUEST,
  payload: { page, limit },
});

export const fetchUsersSuccess = (users: any[]) => ({
  type: ActionTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error: string) => ({
  type: ActionTypes.FETCH_USERS_FAILURE,
  payload: error,
});

export const editProfileRequest = (userId: string, userData: any) => ({
  type: ActionTypes.EDIT_PROFILE_REQUEST,
  payload: { userId, userData },
});

export const editProfileSuccess = (response: any) => ({
  type: ActionTypes.EDIT_PROFILE_SUCCESS,
  payload: response,
});

export const editProfileFailure = (error: string) => ({
  type: ActionTypes.EDIT_PROFILE_FAILURE,
  payload: error,
});
