import { PORT } from "set";
import { getPromise } from "api/Fetch";

// const getPromise = async (urlParam, methodParam) => {
//     return await fetch(`${PORT}/${urlParam}`, { method: methodParam })
//     .then((response) => response.json())
//     .then((responseJson) => responseJson);
// }

export const getEmpListApi = (searchCoCdParam, keywordParam, searchParam) => {
    const search = {
        searchCoCd: searchCoCdParam,
        keyword: keywordParam ? keywordParam : '',
        search: keywordParam ? searchParam : '',
    }
    const queryString = new URLSearchParams(search).toString();
    const promise = getPromise({url: `roleEmp/list?${queryString}`, method: 'GET'});
    return promise.then((responseJson) => responseJson);
}

export const getCorpListApi = () => {
    const promise = getPromise({url: `corp/list`, method: 'GET'});

    return promise.then((responseJson) => responseJson);
}