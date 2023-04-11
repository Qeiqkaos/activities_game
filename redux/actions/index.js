import { ADD_ACTIVITY,REMOVE_ACTIVITY, DECREASE_COUNTER, INCREASE_COUNTER } from '../actionTypes/index';

export const AddActivity = (activity, participants, type, key) => ({
  type: ADD_ACTIVITY,
  payload: {
    activity: activity,
    participants: participants,
    type: type,
    key: key,
  },
});

export const increase = (increament) => {
  return {
    type: INCREASE_COUNTER,
    payload: {
      increaseBy: increament,
    },
  };
};

export const decrease = (decreament) => {
  return {
    type: DECREASE_COUNTER,
    payload: {
      decreaseBy: decreament,
    },
  };
};

export const RemoveActivity = (key) => ({
  type: REMOVE_ACTIVITY,
  payload: { key: key },
});