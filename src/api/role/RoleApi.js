import { getPromise } from "api/Fetch";
import { getCookie } from "common/common";

/* 
    작업명 : 권한 API
    작업자 : 이혜윤
*/

const role = {
  /**
   * 작업명 : 대메뉴 목록
   * 작업자 : 이혜윤
   * @param {*} search
   * @returns
   */
  CheckRoleSession: (menuCd) => {
    const dpGrpCd = getCookie("Emp_Dp_Type");
    const promise = getPromise({
      url: `common/role?menuCd=${menuCd}&dpGrpCd=${dpGrpCd}`,
      method: "GET",
    });

    return promise.then((responseJson) => responseJson);
  },
};

export default role;
