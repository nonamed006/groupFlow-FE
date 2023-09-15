/* ----------------- 액션 타입 (대문자) ------------------ */
const SET_CHANGE_YN = 'corporation/SET_CHANGE_YN';




/* ----------------- 액션 생성 함수 ------------------ */
export const setChangeYn = changeYn =>({ type: SET_CHANGE_YN, changeYn});






/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
    changeYn: false,
    
  };



/* ----------------- 리듀서 ------------------ */
export default function corporation(state = initialState, action) {
    switch(action.type) {
        case SET_CHANGE_YN :
          return {
            ...state,
            changeYn: action.changeYn,
          };
        default:
          return state;
      }
}
