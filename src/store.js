
/**
 * @
 */
import { createStore } from 'redux';

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
const reducer = (state,action) => {

  /* @ */
  if(action.hasOwnProperty('type')){
    switch(action.type){
      case "ADD_VISIT" :
        /* @ */
        state.visitants.push(action.visit);

        /* @ */
        return state;
      break; 
      case "DELETE_VISIT": 
        /* @ */
        delete state.visitants[action.visitKey];

        /* @ */
        return state;
      break;
      case "UPDATE_USER": 
        /* @ */
        state.user = action.user;

        /* @ */
        return state;
      break;
      case "UPDATE_COUNTRYS":
        /* @ */
        state.countrys = action.countrys;

        /* @ */
        return state;
      break;
    }
  }

  /* @ */
  return state;

}


/* @ */
let date    = new Date(),
    thisYear = date.getFullYear(),
    thisMonth= date.getMonth() < 8 ? "0"+(date.getMonth()+1) : date.getMonth()+1,
    thisDay  = date.getDate() < 10  ? "0"+date.getDate()      : date.getDate();


/**
 * @ 
 */
export default createStore(reducer,{
  visitants : [],
  user      : {
    "name"      : "",
    "country"   : "",
    "date"      : ""
  },
  "countrys"    : [],
  "today"       : `${thisYear}-${thisMonth}-${thisDay}`
})
