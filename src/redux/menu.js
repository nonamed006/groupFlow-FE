/* ----------------- 액션 타입 (대문자) ------------------ */
const SET_MENU_LIST = 'menu/SET_MENU_LIST';




/* ----------------- 액션 생성 함수 ------------------ */
export const setMenuList = menuList =>({ type: SET_MENU_LIST, menuList});





/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
    menuList: {},
  };



/* ----------------- 리듀서 ------------------ */
export default function menu(state = initialState, action) {
    switch(action.type) {
        case SET_MENU_LIST :
          return {
            ...state,
            menuList: action.menuList,
          };
        default:
          return state;
      }
}
