import { combineReducers } from "redux";
import emp from './emp';
import solution from './solution';
import corporation from './corporation';
const rootReducer = combineReducers({
    solution,
    corporation,
    emp,
  });
  
  export default rootReducer;