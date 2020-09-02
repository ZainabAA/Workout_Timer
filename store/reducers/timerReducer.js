import {CHANGE_TIMER, RESET_TIMER} from '../actions/timerActions';
import StartTimer from '../../screens/StartTimer';

const initialState = {
    timer: {
        workMin: 0,
        workSec: 0,
        restMin: 0,
        restSec: 0,
        rep: 0
    }
}

const timerReducer = (state=initialState, action) => {
    switch(action.type){
        case 'CHANGE_TIMER':
            return {timer: action.payload}
        case 'RESET_TIMER':
            return {
                timer: {
                workMin: 0,
                workSec: 0,
                restMin: 0,
                restSec: 0,
                rep: 0
                }
            }
        default:
            return state
    }
}

export default timerReducer;