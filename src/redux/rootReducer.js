import { combineReducers } from "redux";
import solution from "./solution";
import menu from "./menu";
const rootReducer = combineReducers({
  solution,
  menu,
});

export default rootReducer;

