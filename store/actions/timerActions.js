import {CHANGE_TIMER, RESET_TIMER} from './actionTypes';

export const changeTimer = (timerObj) => (
    {
        type: CHANGE_TIMER,
        payload: timerObj,
    }
);

export const resetTimer = (timerObj) => (
    {
        type: RESET_TIMER,
        payload: timerObj,
    }
);
