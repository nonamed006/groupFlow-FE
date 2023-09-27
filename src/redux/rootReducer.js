import { combineReducers } from "redux";
import emp from "./emp";
import solution from "./solution";
import menu from "./menu";
const rootReducer = combineReducers({
  solution,
  emp,
  menu,
});

export default rootReducer;

