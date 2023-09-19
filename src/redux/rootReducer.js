import { combineReducers } from "redux";
import emp from './emp';
import solution from './solution';
import dep from './dep';
import depDetail from './depDetail'
import corporation from './corporation';
const rootReducer = combineReducers({
    solution,
    corporation,
    emp,

  });
  
  export default rootReducer;