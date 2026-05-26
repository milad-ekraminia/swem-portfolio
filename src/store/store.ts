import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import dateFilterSlice from './features/date-filter-slice.ts';
import definitionsSlice from './features/definitions-slice.ts';
import treeFilterReducer from './features/tree-filter-slice.ts';
// Reducers
import treeSlice from './features/tree-slice.ts';

const rootReducer = combineReducers({
  tree: treeSlice,
  dateFilter: dateFilterSlice,
  orgId: definitionsSlice,
  treeFilter: treeFilterReducer,
});

const persistConfig = {
  key: 'swem',
  version: 1,
  whitelist: [],
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_REDUX_SECRET_KEY,
    }),
  ],
  storage,
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
