import { getPromise } from "api/Fetch";

const depGrp = {

    getDepGepList: (corpDepCd, search, keyword, pageNum) => {
        const params = new URLSearchParams();
        if (corpDepCd !== '' && (corpDepCd !== undefined && corpDepCd !== 'undefined')) {   // 회사 및 부서 선택 후 조회일 때
            params.append('search', 'code');
            params.append('keyword', corpDepCd);
        }
        else {    // 검색 조회일때
            if (search !== '')
                params.append('search', search);
            if (keyword !== '')
                params.append('keyword', keyword);
        }
        params.append('pageNum', pageNum);
        const paramString = params.toString();

        const promise = getPromise({ url: `depGrp?${paramString}`, method: 'GET' });
        return promise.then((responseJson) => responseJson);
    },

 

};

export default depGrp;


