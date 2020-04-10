import { takeLatest, call, put, all } from 'redux-saga/effects';
import JwtDecode from 'jwt-decode';
import { toast, Zoom } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure, signOut } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, senha } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      senha,
    });

    const { token, nome } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, nome, email));

    history.push('/principal');
  } catch (error) {
    toast.error('Senha incorreta!', {
      transition: Zoom,
    });
    yield put(signFailure());
  }
}

export function* setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  let tokenDecode;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    tokenDecode = JwtDecode(token);
    if (tokenDecode.exp * 1000 < new Date().getTime()) {
      yield put(signOut());
    }
  }
}

export function signOutSaga() {
  history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_OUT', signOutSaga),
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
