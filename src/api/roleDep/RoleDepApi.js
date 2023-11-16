import { getPromise } from "api/Fetch";

const roleDep = {

    /**
     * 권한그룹 목록 조회 - 권한부서
     *  
     */
    getRoleGrpList: ( coCd, dpCd, keyword, pageNum ) => {
        let url = `roleDep/${coCd}/${dpCd}`

        const params = new URLSearchParams();
        if (keyword !== undefined && keyword !== 'undefined') params.append("grpNm", keyword);
        params.append("pageNum", (pageNum !== undefined && pageNum !== 'undefined')?pageNum:1);
        const paramString = params.toString();
        if (paramString) 
            url += "?" + paramString;

        const promise = getPromise({ url: url, method: 'GET' });
        return promise.then((responseJson) => responseJson);
    },

    /**
     * 권한-부서 맵핑 수정
     * @param {*} coCd 
     * @param {*} roleCorpCd 
     * @returns 
     */
    postRoleDepList: ( list ) => {
        const promise = getPromise({
            url: `roleDep`,
            method: 'post',
            body: JSON.stringify(list)
         });
        return promise.then((responseJson) => responseJson);
    },
};

export default roleDep;