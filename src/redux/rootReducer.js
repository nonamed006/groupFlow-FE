import { combineReducers } from "redux";
import emp from './emp';
import solution from './solution';
import dep from './dep';
import depDetail from './depDetail'
import menu from './menu'
import depOrg from './depOrg';

const rootReducer = combineReducers({
    solution,
    emp, 
    dep,
    depDetail,
    depOrg, menu
})

  export default rootReducer;