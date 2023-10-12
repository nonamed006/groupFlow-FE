import { PORT } from "set";

const getPromise = async (urlParam, methodParam) => {
    return await fetch(`${PORT}/${urlParam}`, { method: methodParam })
    .then((response) => response.json())
    .then((responseJson) => responseJson);
}

export const getEmpListApi = (searchCoCd, searchDepNm, searchEmpNm) => {
    const search = {
        searchCoCd: searchCoCd,
        searchDepNm: searchDepNm ? searchDepNm : '',
        searchEmpNm: searchEmpNm ? searchEmpNm : '',
    }
    const queryString = new URLSearchParams(search).toString();
    const promise = getPromise(`roleEmp/list?${queryString}`, 'GET');
    return promise.then((responseJson) => responseJson);
}

export const getCorpListApi = () => {
    const promise = getPromise(`corp/list`, 'GET');

    return promise.then((responseJson) => responseJson);
}