/* ----------------- 액션 타입 (대문자) ------------------ */
const SET_DATA_PK = 'solution/SET_DATA_PK';
const SET_DATA = 'solution/SET_DATA';
const SET_IS_READ = 'solution/SET_IS_READ';




/* ----------------- 액션 생성 함수 ------------------ */
export const setDataPk = dataPk =>({ type: SET_DATA_PK, dataPk});
export const setData = dataList =>({ type: SET_DATA, dataList});
export const setIsRead = isRead =>({ type: SET_IS_READ, isRead});





/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
    dataPk: 0,
    isRead: true,
    dataList: {},
  };



/* ----------------- 리듀서 ------------------ */
export default function solution(state = initialState, action) {
    switch(action.type) {
        case SET_DATA_PK :
          return {
            ...state,
            dataPk: action.dataPk,
          };
          case SET_DATA :
          return {
            ...state,
            dataList: action.dataList,
          };
          case SET_IS_READ :
          return {
            ...state,
            isRead: action.isRead,
          };
        default:
          return state;
      }
}
