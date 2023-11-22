import { getPromise } from "api/Fetch";

const corp = {
  // 회사 정렬 기본값
  getCorpSortApi: () => {
    const promise = getPromise({ url: `corp/sort`, method: "GET" });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 회사 정보 조회
   * @param {string} coCd 회사코드
   * @returns
   */
  getCorpInfo: (coCd) => {
    const promise = getPromise({ url: `corp/${coCd}`, method: "GET" });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 회사 정보 저장
   * @param {corpDto} corpDto
   * @returns
   */
  postCorpInfo: (corpDto) => {
    const promise = getPromise({
      url: `corp`,
      method: "POST",
      body: JSON.stringify(corpDto),
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 회사 정보 수정
   * @param {corpDto} corpDto
   * @returns
   */
  putCorpInfo: (corpDto) => {
    const promise = getPromise({
      url: `corp`,
      method: "PUT",
      body: JSON.stringify(corpDto),
    });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 회사 삭제
   * @param {string} coCd 회사코드
   * @returns
   */
  deleteCorpInfo: (coCd) => {
    const promise = getPromise({ url: `corp/${coCd}`, method: "PUT" });
    return promise.then((responseJson) => responseJson);
  },

  /**
   * 회사 목록 조회 및 검색
   * @param {string} keyword 검색어
   * @param {string} useYn 검색하는 사용여부(전체/사용/미사용)
   * @param {number} pageNum
   * @returns
   */
  getCorpList: (keyword, useYn, pageNum) => {
    const params = new URLSearchParams();
    // 검색
    if (keyword !== "" && keyword !== undefined && keyword !== "undefined")
      params.append("keyword", keyword);
    if (useYn !== "" && useYn !== undefined && useYn !== "undefined")
      params.append("useYn", useYn);
    // 페이지 요청
    params.append("pageNum", pageNum);
    // URL에 파라미터 추가
    const paramString = params.toString();
    const promise = getPromise({ url: `corp?${paramString}`, method: "GET" });
    return promise.then((responseJson) => responseJson);
  },

  getCorpsNmList: () => {
    const promise = getPromise({ url: `corp/list`, method: "GET" });
    return promise.then((responseJson) => responseJson);
  },
};

export default corp;
