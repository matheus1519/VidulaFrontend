import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import watch from './watch/reducer';

export default combineReducers({
  auth,
  user,
  watch,
});
