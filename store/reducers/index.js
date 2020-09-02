import { combineReducers } from 'redux';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
    rootTimer: timerReducer
});

export default rootReducer;