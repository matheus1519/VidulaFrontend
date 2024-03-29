import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'vidula',
      storage,
      whitelist: ['auth', 'user', 'watch'],
    },
    reducers
  );

  return persistedReducer;
};
