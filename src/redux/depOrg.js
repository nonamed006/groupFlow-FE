/* ----------------- 액션 타입 (대문자) ------------------ */
const SET_DEP_ORG = 'depOrg/SET_DEP_ORG';




/* ----------------- 액션 생성 함수 ------------------ */
export const setDepOrg = depOrg =>({ type: SET_DEP_ORG, depOrg});





/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
    depOrg: 0,
    
  };



/* ----------------- 리듀서 ------------------ */
export default function depOrg(state = initialState, action) {
    switch(action.type) {
        case SET_DEP_ORG :
          return {
            ...state,
            depOrg: action.depOrg,
          };
        default:
          return state;
      }
}
