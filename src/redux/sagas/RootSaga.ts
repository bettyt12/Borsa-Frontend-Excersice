// sagas/index.ts
import { all } from 'redux-saga/effects';

// import { watchLoginUser } from './authSaga';
import { watchEditProfile, watchFetchUsers, watchLoginUser, watchRegisterUser } from './UserSaga';
// import { watchFetchUsers, watchUpdateProfile } from './userSaga';

export default function* rootSaga() {
  yield all([
    watchRegisterUser(),
    watchLoginUser(),
    watchFetchUsers(),
    watchEditProfile(),
  ]);
}
