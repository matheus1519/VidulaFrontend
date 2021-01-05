/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  discipline: null,
  video: null,
  path: '',
};

export default function watch(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@watch/ADD_DISCIPLINE': {
        draft.discipline = action.payload.discipline;
        break;
      }
      case '@watch/ADD_VIDEO': {
        draft.video = action.payload.video;
        break;
      }
      case '@watch/UPDATE_PATH': {
        draft.path = action.payload.path;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.discipline = null;
        draft.video = null;
        draft.path = '';
        break;
      }
      default:
    }
  });
}
