import { getPromise } from "api/Fetch";

const dep = {
  //부서 상세조회 Api
  getDepDtoApi: (searchDpCdParam) => {
    const search = {
      dpCd: searchDpCdParam,
    };
    const queryString = new URLSearchParams(search).toString();
    const promise = getPromise({
      url: `dep/detail?${queryString}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },

  //부서원 조회 Api
  getDepGroupApi: (searchDpCdParam) => {
    const search = {
      dpCd: searchDpCdParam,
    };
    const queryString = new URLSearchParams(search).toString();
    const promise = getPromise({
      url: `dep/dg?${queryString}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },
  //부서 저장 Api
  fetchSaveDepApi: (depDto) => {
    const promise = getPromise({
      url: `dep`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(depDto),
    });
    return promise.then((responseJson) => responseJson);
  },
  //부서 수정 Api
  fetchUpdateDepApi: (depDto) => {
    const promise = getPromise({
      url: `dep`,
      method: "PUT",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(depDto),
    });
    return promise.then((responseJson) => responseJson);
  },
  //부서 삭제 Api
  deleteBtnApi: (searchDpCdParam) => {
    const search = {
      dpCd: searchDpCdParam,
    };
    const queryString = new URLSearchParams(search).toString();
    const promise = getPromise({
      url: `dep?${queryString}`,
      method: "DELETE",
    });
    return promise.then((responseJson) => responseJson);
  },
  //부서 조직도 조회 Api
  getDepOrganizationApi: (searchCoCd, keyword) => {
    const search = {
      empYn: "N",
      searchCoCd: searchCoCd,
      keyword: keyword,
      search: "dep",
    };
    const queryString = new URLSearchParams(search).toString();
    const promise = getPromise({
      url: `roleEmp/list?${queryString}`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },
  //회사 목록 조회
  getCorpNmListApi: () => {
    const promise = getPromise({
      url: `corp/list?`,
      method: "GET",
    });
    return promise.then((responseJson) => responseJson);
  },
};
export default dep;
