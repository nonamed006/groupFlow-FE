import { combineReducers } from "redux";
import emp from './emp';
import solution from './solution';
import dep from './dep';
import depDetail from './depDetail'
import corporation from './corporation';
import depOrg from './depOrg';
const rootReducer = combineReducers({
    solution,
    corporation,
    dep,depDetail,depOrg,
    emp,

  });
  
  export default rootReducer;