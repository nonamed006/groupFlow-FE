import { combineReducers } from "redux";

import solution from './solution';
import dep from './dep';
import depDetail from './depDetail'

const rootReducer = combineReducers({
    solution, dep, depDetail
  });
  
  export default rootReducer;