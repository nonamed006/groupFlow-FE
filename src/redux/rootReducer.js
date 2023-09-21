import { combineReducers } from "redux";
import emp from './emp';
import solution from './solution';
import dep from './dep';
import depDetail from './depDetail'
import corporation from './corporation';
import depOrg from './depOrg';
import menu from './menu'

const rootReducer = combineReducers({
    solution,
    corporation,
    dep,depDetail,depOrg,
    emp,
    menu
  });
  
  export default rootReducer;