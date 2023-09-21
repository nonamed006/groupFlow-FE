/* ----------------- 액션 타입 (대문자) ------------------ */
const SET_MENU_LIST = 'menu/SET_MENU_LIST';
const SET_MENU = 'menu/SET_MENU';




/* ----------------- 액션 생성 함수 ------------------ */
export const setMenuList = menuList => ({ type: SET_MENU_LIST, menuList });
export const setMenu = menu => ({ type: SET_MENU, menu });





/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
    menuList: [],
    menu: {},
  };



/* ----------------- 리듀서 ------------------ */
export default function menu(state = initialState, action) {
    switch(action.type) {
        case SET_MENU_LIST :
          return {
            ...state,
            menuList: action.menuList,
          };
        case SET_MENU : 
          return {
            ...state,
            menu: action.menu,
          }
        default:
          return state;
      }
}
