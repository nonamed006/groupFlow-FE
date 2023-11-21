import { getPromise } from "api/Fetch";

const roleGrp = {
  /**
   * 권한그룹 목록 조회
   * @param {*} searchCorp  검색할 회사
   * @param {*} keyword 권한그룹명 검색어
   * @param {*} pageNum
   * @returns
   */
  getRoleGrpList: (searchCorp, keyword, pageNum) => {
    let url = `roleGrp`;
    const params = new URLSearchParams();
    if (searchCorp !== undefined && searchCorp !== "undefined")
      params.append("coCd", searchCorp);
    if (keyword !== undefined && keyword !== "undefined")
      params.append("grpNm", keyword);
    params.append("pageNum", pageNum);
    const paramString = params.toString();
    if (paramString) url += "?" + paramString;
    const promise = getPromise({ url: url, method: "GET" });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 권한그룹 등록
   * @param {*} roleGrp
   * @returns
   */
  postRoleGrp: (roleGrp) => {
    const promise = getPromise({
      url: `roleGrp`,
      method: "POST",
      body: JSON.stringify(roleGrp),
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 권한그룹 사용여부 수정
   * @param {*} roleGrpDto
   * @returns
   */
  putRoleGrp: (roleGrpDto) => {
    const promise = getPromise({
      url: `roleGrp/useYn`,
      method: "put",
      body: JSON.stringify(roleGrpDto),
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 권한그룹 삭제
   * @param {Array:{roleGrpDto}} roleGrpList
   * @returns
   */
  deleteRoleGrp: (roleGrpList) => {
    const promise = getPromise({
      url: `roleGrp/delYn`,
      method: "PUT",
      body: JSON.stringify(roleGrpList),
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 권한그룹 코드에 따른 사용자 목록 조회 + 사용자 검색
   * @param {*} rgCd
   * @param {*} keyword 검색어(사용자 이름)
   * @param {*} pageNum
   * @returns
   */
  getRoleGrpUserList: (rgCd, keyword, pageNum) => {
    let url = `roleGrp/${rgCd}`;

    // URL 파라미터 생성
    const params = new URLSearchParams();
    if (keyword !== undefined && keyword !== "undefined") {
      params.append("keyword", keyword);
    }
    params.append("pageNum", pageNum);
    // URL에 파라미터 추가
    const paramString = params.toString();
    if (paramString) url += "?" + paramString;
    const promise = getPromise({ url: url, method: "GET" });
    return promise.then((responseJson) => responseJson);
  },
};

export default roleGrp;
