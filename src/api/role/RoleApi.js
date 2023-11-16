import { propNames } from '@chakra-ui/system';
import { getPromise } from 'api/Fetch';
import { PORT } from 'set';

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
    checkRoleSession: (dpGrpCd, search) => {
        const queryString = new URLSearchParams(search).toString();
        const promise = getPromise({url: `common/role-${dpGrpCd}?${queryString}`, method: 'GET'});

        return promise.then((responseJson) => responseJson);
    },
}

export default role;