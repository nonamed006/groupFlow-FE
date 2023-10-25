import { getPromise } from "api/Fetch";

// const getPromise = async (urlParam, methodParam) => {
//     return await fetch(`${PORT}/${urlParam}`, { method: methodParam })
//     .then((response) => response.json())
//     .then((responseJson) => responseJson);
// }
const roleEmp = {
    /**
     * 작업명 : 회사 + 부서 + 사원 목록 조회(Object형)
     * @param {string} searchCoCdParam 
     * @param {string} keywordParam 
     * @param {string} searchParam 
     * @returns promise
     */
    getEmpListApi : (searchCoCdParam, keywordParam) => {
        const search = {
            searchCoCd: searchCoCdParam,
            keyword: keywordParam ? keywordParam : '',
        }
        const queryString = new URLSearchParams(search).toString();
        const promise = getPromise({url: `roleEmp/list?${queryString}`, method: 'GET'});
        return promise.then((responseJson) => responseJson);
    },
    
    /**
     * 작업명 : 회사 카테고리 조회
     * @returns promise
     */
    getCorpListApi : () => {
        const promise = getPromise({url: `corp/list`, method: 'GET'});
    
        return promise.then((responseJson) => responseJson);
    },

    /**
     * 작업명 : 권한 목록 조회
     * @param {string} dpGrpCd 
     * @param {string} params
     * @returns 
     */
    getRoleListApi : (dpGrpCd, params) => {//coCd, empCd,
        const promise = getPromise({url: `roleEmp/list-${dpGrpCd}?${params}`, method: 'GET'});//${coCd}-${empCd}

        return promise.then(responseJson => responseJson);
    },

    mappingEmpRoleApi : (dpGrpCd, rgCdList) => {
        console.log(rgCdList);
        const promise = getPromise({url: `roleEmp/${dpGrpCd}`, method: 'PUT', 
            header: {'Content-type': 'application/json; utf-8'},
            body: JSON.stringify(rgCdList),
        });
        
        return promise.then(responseJson => responseJson);
    }
}

export default roleEmp;