import { combineReducers } from "redux";

import solution from './solution';
import emp from './emp';

const rootReducer = combineReducers({
    solution,
    emp,
  });
  
  export default rootReducer;