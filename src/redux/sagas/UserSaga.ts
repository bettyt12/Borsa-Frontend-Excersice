import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes, editProfileFailure, editProfileSuccess, fetchUsersFailure, fetchUsersSuccess, loginUserFailure, loginUserSuccess, registerUserFailure, registerUserSuccess } from '../actions/UserActions';
import { User } from '../../types';
import { BASE_URL } from '../../../config';

function* registerUser(action: any): Generator {
  try {
    const response: any = yield call(fetch, `${BASE_URL}/register/v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });

    if (!response.ok) {
      const error: any = yield response.json();
      throw new Error(error.message || 'Failed to register user');
    }

    const user = yield response.json();
    yield put(registerUserSuccess(user));
  } catch (error) {
    yield put(registerUserFailure(error.message));
  }
}

function* loginUser(action: any): Generator {
  try {
    const response: any = yield call(fetch, `${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });
	
    if (!response.ok) {
      const error :any = yield response.json();
		
      throw new Error(error.message || 'Failed to login user');
    }

    const user = yield response.json();
    yield put(loginUserSuccess(user));
  } catch (error) {
    yield put(loginUserFailure(error.message));
    console.log(error.message ,"catch error");
  }
}

function* fetchUsers(action: any): Generator {
  const { page, limit } = action.payload;
  
  try {
    const response :any= yield call(fetch, `${BASE_URL}/fetch/dummy/user-v2?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    
    const users:any = yield response.json();
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* editProfile(action: any): Generator {
  const { userId, userData } = action.payload;
  try {
    const response:any = yield call(fetch, `${BASE_URL}/profile?id=${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = yield response.json();
      throw new Error(response.message || 'Failed to update profile');
    }

    const updatedProfile = yield response.json();
    yield put(editProfileSuccess(updatedProfile));
  } catch (error) {
    yield put(editProfileFailure(error.message));
  }
}

export function* watchEditProfile() {
  yield takeLatest(ActionTypes.EDIT_PROFILE_REQUEST, editProfile);
}

export function* watchFetchUsers() {
  yield takeLatest(ActionTypes.FETCH_USERS_REQUEST, fetchUsers);
}

export function* watchLoginUser() {
  yield takeLatest(ActionTypes.LOGIN_USER_REQUEST, loginUser);
}

export function* watchRegisterUser() {
  yield takeLatest(ActionTypes.REGISTER_USER_REQUEST, registerUser);
}