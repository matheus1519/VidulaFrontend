import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, senha } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    senha,
  });

  console.tron.log(response);

  const { token, nome } = response.data;

  yield put(signInSuccess(token, nome));

  history.push('/principal');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
