/* ----------------- 액션 타입 (대문자) ------------------ */
const SET_DATA_PK = 'depDetail/SET_DATA_PK';




/* ----------------- 액션 생성 함수 ------------------ */
export const setDataPk = dataPk =>({ type: SET_DATA_PK, dataPk});





/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
    dataPk: 0,
    
  };



/* ----------------- 리듀서 ------------------ */
export default function depDetail(state = initialState, action) {
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
