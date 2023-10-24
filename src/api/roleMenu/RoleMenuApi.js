import { getPromise } from "api/Fetch";

const roleMenu = {
    /**
     * 
     * @param {*} rgCd 권한그룹 코드
     * @param {*} type (회사/부서/사용자) 매핑 타입
     * @param {*} code (회사/부서/사용자) 선택된 코드
     * @param {*} grpNm 권한그룹명
     * @param {*} selectedMenu 선택된 대메뉴
     * @param {*} keyword 메뉴 검색어
     * @param {*} typeCd 메뉴 타입(사용자/관리자/전체)
     * @returns 
     */
    getRoleMenuList : (rgCd, type, code, grpNm, selectedMenu, keyword, typeCd ) => {
        let url = `roleMenu`;

        if (rgCd === 'total') url += `/${type}/${code}`;
        else url += `/roleGrp/${rgCd}`;

        const params = new URLSearchParams();
        // 검색 조건
        if (rgCd === 'total' && grpNm !== undefined && grpNm !== 'undefined')
            params.append("grpNm", grpNm);   // 권한그룹명 검색 시
        if (selectedMenu !== undefined && selectedMenu !== 'undefined')
            params.append("gnb", selectedMenu);
        if (keyword !== undefined && keyword !== 'undefined')
            params.append("keyword", keyword);
        if (typeCd !== undefined && typeCd !== 'undefined')
            params.append("menuType", typeCd);
        const paramString = params.toString();
        if (paramString) {
            url += "?" + paramString;
        }

        const promise = getPromise({ url: url, method: 'GET' });
        return promise.then((responseJson) => responseJson);
    },

    /**
     * 권한그룹의 권한메뉴 대메뉴 이름/코드 목록 조회
     * @param {*} rgCd 
     * @param {*} type 
     * @param {*} code 
     * @param {*} grpNm 
     * @param {*} typeCd 
     * @returns 
     */
    getRoleMenuGnbList : (rgCd, type, code, grpNm, typeCd) => {
        let url = `roleMenu/gnbList`;

        if (rgCd === 'total') {
            url += `/${type}/${code}`;
        } else {
            url += `/roleGrp/${rgCd}`;
        }
        // URL 파라미터 생성
        const params = new URLSearchParams();

        if (rgCd === 'total' && grpNm !== undefined && grpNm !== 'undefined')
            params.append("grpNm", grpNm);   // 권한그룹명 검색 시
        if (typeCd !== undefined && typeCd !== 'undefined')
            params.append("menuType", typeCd);

        // URL에 파라미터 추가
        const paramString = params.toString();
        if (paramString) {
            url += "?" + paramString;
        }
        const promise = getPromise({ url: url, method: 'GET' });
        return promise.then((responseJson) => responseJson);
    }
};

export default roleMenu;