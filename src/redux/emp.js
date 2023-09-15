/* ----------------- 액션 타입 (대문자) ------------------ */
const SET_EMP_LIST = 'emp/SET_EMP_LIST';




/* ----------------- 액션 생성 함수 ------------------ */
export const setEmpList = empList =>({ type: SET_EMP_LIST, empList});





/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
    empList: {},
  };



/* ----------------- 리듀서 ------------------ */
export default function emp(state = initialState, action) {
    switch(action.type) {
        case SET_EMP_LIST :
          return {
            ...state,
            empList: action.empList,
          };
        default:
          return state;
      }
}
