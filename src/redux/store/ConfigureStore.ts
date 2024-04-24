import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/RootSaga';
import rootReducer from '../reducers';

const initialState = {
  users: {
		users:[],
    userData: null,
    loading: false,
    error: null,
  },
};
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
	initialState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;