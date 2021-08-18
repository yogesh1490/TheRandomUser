import {combineReducers} from 'redux';
import appReducer from './appReducer';
import getFavouritesActionReducer from './getFavouritesActionReducer';
import getUserListReducer from './getUserListReducer';

export default combineReducers({
  appReducer,
  getUserListReducer,
  getFavouritesActionReducer,
});
