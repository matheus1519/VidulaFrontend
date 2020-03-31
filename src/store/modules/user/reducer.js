/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  nome: '',
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.nome = action.payload.nome;
        draft.email = action.payload.email;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.nome = '';
        draft.email = '';
        break;
      }
      default:
    }
  });
}
