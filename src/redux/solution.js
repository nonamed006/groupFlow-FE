/* ----------------- 액션 타입 ------------------ */
const SET_DATA_PK = 'comn/SET_DATA_PK';




/* ----------------- 액션 생성 함수 ------------------ */
export const setDataPk = dataPk =>({ type: SET_DATA_PK, dataPk});





/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
    dataPk: 0,
  };



/* ----------------- 리듀서 ------------------ */
export default function solution(state = initialState, action) {
    switch(action.type) {
        case SET_DATA_PK :
          return {
            ...state,
            dataPk: action.dataPk,
          };
        default:
          return state;
      }
}
