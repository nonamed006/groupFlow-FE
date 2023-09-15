import { combineReducers } from "redux";

import solution from './solution';
import corporation from './corporation';
const rootReducer = combineReducers({
    solution,
    corporation
  });
  
  export default rootReducer;