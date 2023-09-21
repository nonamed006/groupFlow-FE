import { combineReducers } from "redux";
import emp from './emp';
import solution from './solution';
import dep from './dep';
import depDetail from './depDetail'

const rootReducer = combineReducers({
    solution,
    emp, 
    dep,
    depDetail

})


  export default rootReducer;