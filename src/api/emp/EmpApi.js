import { getPromise } from "api/Fetch";

const emp = {
  /**
   * 사원 정보 조회
   * @param {string} srhCorp 회사코드
   * @param {string} srhWorkType 재직구분코드
   * @param {string} srhNm 이름/아이디 검색어
   * @returns
   */
  getEmpList: (srhCorp, srhWorkType, srhNm) => {
    const params = new URLSearchParams();
    // 검색
    if (srhCorp !== "" && srhCorp !== undefined && srhCorp !== "undefined")
      params.append("srhCorp", srhCorp);
    if (
      srhWorkType !== "" &&
      srhWorkType !== undefined &&
      srhWorkType !== "undefined"
    )
      params.append("srhWorkType", srhWorkType);
    if (srhNm !== "" && srhNm !== undefined && srhNm !== "undefined")
      params.append("srhNm", srhNm);
    // URL에 파라미터 추가
    const paramString = params.toString();

    const promise = getPromise({
      url: `emp/getEmp?${paramString}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 사원 ID 변경
   * @param {empId} empId
   * @param {empCd} empCd
   * @param {modalTabStatus} modalTabStatus
   * @returns
   */
  updateEmpID: (empId, empCd, modalTabStatus) => {
    const promise = getPromise({
      url: `emp/updateEmpId/${empId}/${empCd}/${modalTabStatus}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 사원 비밀번호 변경
   * @param {empPwd} empPwd
   * @param {empCd} empCd
   * @param {modalTabStatus} modalTabStatus
   * @returns
   */
  resetPwd: (empPwd, empCd, modalTabStatus) => {
    const promise = getPromise({
      url: `emp/resetPwd/${empPwd}/${empCd}/${modalTabStatus}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 사원 퇴사 처리
   * @param {empCd} empCd 사원코드
   * @returns
   */
  updateWorkType: (empCd) => {
    const promise = getPromise({
      url: `emp/updateWorkType/${empCd}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 사원 조직 정보 추가
   * @param {empDto} empDto
   * @returns
   */
  insertEmpDep: (empDto) => {
    const promise = getPromise({
      url: `emp/insertEmpDep`,
      method: "POST",
      body: JSON.stringify(empDto),
    });
  },

  /**
   * 사원 조직 정보 조회
   * @param {string} empCd 사원 코드
   * @returns
   */
  getDeptInfo: (empCd) => {
    const promise = getPromise({
      url: `emp/selectEmpDeptList/${empCd}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 사원 정보 수정
   * @param {empDto} empDto
   * @returns
   */
  updateEmpInfo: (empDto) => {
    const promise = getPromise({
      url: `emp/updateEmpInfo`,
      method: "POST",
      body: JSON.stringify(empDto),
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 사원 ID 변경
   * @param {empId} empId
   * @param {empCd} empCd
   * @param {modalTabStatus} modalTabStatus
   * @returns
   */
  updateEmpID: (empId, empCd, modalTabStatus) => {
    const promise = getPromise({
      url: `emp/updateEmpId/${empId}/${empCd}/${modalTabStatus}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 사원 퇴사 처리
   * @param {empCd} empCd 사원코드
   * @returns
   */
  updateWorkType: (empCd) => {
    const promise = getPromise({
      url: `emp/updateWorkType/${empCd}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 사원 조직 정보 추가
   * @param {empDto} empDto
   * @returns
   */
  insertEmpDep: (empDto) => {
    const promise = getPromise({
      url: `emp/insertEmpDep`,
      method: "POST",
      body: JSON.stringify(empDto),
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 사원 조직 정보 수정
   * @param {empDto} empDto
   * @returns
   */
  updateEmpDep: (empDto) => {
    const promise = getPromise({
      url: `emp/updateEmpDep`,
      method: "POST",
      body: JSON.stringify(empDto),
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 사원 삭제
   * @param {empCd} empCd 사원코드
   * @returns
   */
  deleteEmp: (empCd) => {
    const promise = getPromise({
      url: `emp/deleteEmp/${empCd}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 선택한 사원 조직 정보 삭제
   * @param {empDto} empDto
   * @returns
   */
  deleteChkEmpDep: (empDepDto) => {
    const promise = getPromise({
      url: `emp/deleteChkEmpDep`,
      method: "POST",
      body: JSON.stringify(empDepDto),
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 사원 ID 중복 확인
   * @param {empId} empId 입력받은 사원ID
   * @param {modalTabStatus} modalTabStatus 현재 탭
   * @returns
   */
  chkEmpId: (empId, modalTabStatus) => {
    const promise = getPromise({
      url: `emp/selectChkEmpId/${empId}/${modalTabStatus}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },
};

export default emp;
