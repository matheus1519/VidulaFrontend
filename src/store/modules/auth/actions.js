export function signInRequest(email, senha) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, senha },
  };
}

export function signInSuccess(token, nome, email) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, nome, email },
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
