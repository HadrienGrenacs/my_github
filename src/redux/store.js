import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import favoritesReducer from './reducers/favoritesReducer';

const persistConfig = {
  key: 'brkp',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
