import { ADD_ACTIVITY,DECREASE_COUNTER,REMOVE_ACTIVITY, INCREASE_COUNTER } from '../actionTypes/index';
const initial_state = {
    activitiesList:[],
    counter:0,
  };
export default function (state = initial_state, action) {
    if (action.type == ADD_ACTIVITY) {
        var myarrayactivities = state.activitiesList;
        if(action.payload.key != myarrayactivities.key && action.payload.activity!=''){
        myarrayactivities.push({
            activity: action.payload.activity,
            participants: action.payload.participants,
            type: action.payload.type,
            key: action.payload.key,
          });}
        return ({
          ...state,
          activitiesList: myarrayactivities,
        });
      }
      else if (action.type == REMOVE_ACTIVITY) {
        return {
          ...state,
          activitiesList: state.activitiesList.filter(
            (activity) => activity.key !== action.payload.key
          ),
        };}
      else if (action.type == DECREASE_COUNTER) {
        return { ...state, counter: state.counter - action.payload.decreaseBy };
      } 
      else if (action.type == INCREASE_COUNTER) {
        return { ...state, counter: state.counter + action.payload.increaseBy};
      } 
    return state;
  }