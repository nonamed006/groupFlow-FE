/* ----------------- 액션 타입 (대문자) ------------------ */
const SET_DATA_PK = 'emp/SET_DATA_PK';
const SET_DATA = 'emp/SET_DATA';
const SET_IS_READ = 'emp/SET_IS_READ';
//사원 정보
const SET_EMP_LIST = 'emp/SET_EMP_LIST';
//사원 조직 정보
const SET_EMP_DEPT = 'emp/SET_EMP_DEPT'





/* ----------------- 액션 생성 함수 ------------------ */
export const setDataPk = dataPk =>({ type: SET_DATA_PK, dataPk});
export const setData = dataList =>({ type: SET_DATA, dataList});
export const setIsRead = isRead =>({ type: SET_IS_READ, isRead});
export const setEmpList = empList =>({ type: SET_EMP_LIST, empList});
export const setEmpDept = empDept =>({ type: SET_EMP_DEPT, empDept});






/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
    dataPk: 0,
    isRead: true,
    dataList: {},
    empList: {},
    empDept: [],
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
          case SET_EMP_LIST :
          return {
            ...state,
            empList: action.empList,
          };
          case SET_EMP_DEPT :
          return {
            ...state,
            empDept: action.empDept,
          };
        default:
          return state;
      }
}
