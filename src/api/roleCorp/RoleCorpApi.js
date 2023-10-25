import { getPromise } from "api/Fetch";

const roleCorp = {

    /**
     * 권한그룹 목록 조회 - 권한회사
     * @param {string} coCd 회사코드
     * @param {string} keyword 권한그룹명 검색어
     * @param {number} pageNum 
     * @returns 
     */
    getRoleGrpList: ( coCd, keyword, pageNum ) => {
        let url = `roleCorp/${coCd}`

        const params = new URLSearchParams();
        if (keyword !== undefined && keyword !== 'undefined') params.append("grpNm", keyword);
        params.append("pageNum", pageNum);
        const paramString = params.toString();
        if (paramString) 
            url += "?" + paramString;

        const promise = getPromise({ url: url, method: 'GET' });
        return promise.then((responseJson) => responseJson);
    },

    /**
     * 권한-회사 맵핑 수정
     * @param {*} coCd 
     * @param {*} roleCorpCd 
     * @returns 
     */
    putRoleCorpList: ( coCd, roleCorpCd ) => {
        const promise = getPromise({
            url: `roleCorp/${coCd}`,
            method: 'PUT',
            body: JSON.stringify(roleCorpCd)
         });
        return promise.then((responseJson) => responseJson);
    },
};

export default roleCorp;