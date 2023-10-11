import { useState } from 'react';
import { PORT } from 'set';
/* 
    작업명 : 메뉴 API
    작업자 : 이혜윤
*/

/* 
    작업명 : 대메뉴 카테고리 목록 조회
    작업자 : 이혜윤
*/
//const response = {};

const fetchMethod = (url, method, body, header) => {
    fetch(`${PORT}${url}`, {
        method: method,
        body: body,
        header: header,
    })
    .then(response => response.json())
    .then(responseJson => {
        return responseJson;
    });
}

export const getGnbCategoryList = () => {
    const response = fetchMethod('/menu/category', 'GET', {}, {});
    console.log(response);

    return response;
}