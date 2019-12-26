import { all, takeLatest, call, put } from 'redux-saga/effects';

import { signInSuccess, signInFailure } from './actions';
import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  const { email, password } = payload;

  let token = null;
  let user = null;

  // Catching errors while the authentication request and then populating the variables with the response
  try {
    const response = yield call(api.post, 'sessions', { email, password });
    token = response.data.token;
    user = response.data.user;
  } catch (err) {
    console.tron.log(`ERROR - Authentication failed - ${err.message}`);
    return yield put(signInFailure());
  }

  // Verifying if the variables aren't undefined or null
  if (!token || !user) {
    return console.tron.log(
      `ERROR - Authentication failed - Invalid token and user`
    );
  }

  // Sending the success action with the user data
  yield put(signInSuccess(token, user));
  return history.push('/students');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
