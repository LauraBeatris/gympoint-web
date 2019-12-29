import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { css } from 'glamor';

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

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    toast.error('Erro na autenticação. Verifique seus dados', {
      className: css({
        background: '#fff !important',
        color: 'rgb(221, 90, 70) !important',
      }),
      bodyClassName: css({
        fontSize: '16px',
        fontWeight: 'bold',
      }),
      progressClassName: css({
        background: 'rgb(221, 90, 70) !important',
      }),
    });
    return yield put(signInFailure());
  }

  // Sending the success action with the user data
  yield put(signInSuccess(token, user));
  return history.push('/students');
}

export function signOut() {
  return history.push('/');
}

export function setToken({ payload }) {
  // First time of the user in the app - Nothing sent to the redux store yet
  if (!payload) return;

  // Getting the token data from the auth state
  const { token } = payload.auth;
  // And then setting the authorization header with the token
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
