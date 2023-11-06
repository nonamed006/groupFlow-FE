import { propNames } from '@chakra-ui/system';
import { getPromise } from 'api/Fetch';
import { PORT } from 'set';

/* 
    작업명 : 메뉴 API
    작업자 : 이혜윤
*/
const menu = {

    /**
     * 작업명 : 대메뉴 목록
     * 작업자 : 이혜윤
     * @param {*} search 
     * @returns 
     */
    getGnbMenuList: (search) => {
        const queryString = new URLSearchParams(search).toString();
        const promise = getPromise({url: `menu/list?${queryString}`, method: 'GET'});

        return promise.then((responseJson) => responseJson);
    },

    /**
     * 작업명 : 하위메뉴 목록
     * 작업자 : 이혜윤
     * @param {String} menuCd 
     * @param {*} search 
     * @returns 
     */
    getLnbMenuList: (menuCd, search) => {
        const queryString = new URLSearchParams(search).toString();
        const promise = getPromise({url: `menu/list-${menuCd}?${queryString}`, method: 'GET'});

        return promise.then((responseJson) => responseJson);
    },

    /**
     * 작업명 : 메뉴 정보 조회
     * 작업자 : 이혜윤
     * @param {String} menuCd 
     * @returns 
     */
    getMenuDetail: (menuCd) => {
        const promise = getPromise({url: `menu/find-${menuCd}`, method: 'GET'});

        return promise.then((responseJson) => responseJson);
    },

    /**
     * 작업명 : 대메뉴 카테고리 조회
     * 작업자 : 이혜윤
     * @returns Promise
     */
	getGnbCategoryList : () => {
        const promise = getPromise({url: 'menu/category', method: 'GET'});

        return promise.then((responseJson) => responseJson);
	},

    /**
     * 작업명 : 하위메뉴 카테고리 목록 조회
     * 작업자 : 이혜윤
     * @param {String} searchGnbMenuCd 
     * @returns Promise
     */
	getLnbCategoryList : (searchGnbMenuCd) => {
        const promise = getPromise({url: `menu/category-${searchGnbMenuCd}`, method: 'GET'});

        return promise.then((responseJson) => responseJson);
	},

    /**
     * 작업명 : 아이콘 목록 조회
     * 작업자 : 이혜윤
     * @returns Promise
     */
    getIcons: () => {
        const promise = getPromise({url: `menu/icons`, method: 'GET'});

        return promise.then((responseJson) => responseJson);
    },

    registIcon: (file) => {
        const form = new FormData();
        form.append('file', file);

        const promise = getPromise({
            url: `menu/icons`,
            method: 'POST',
            headers: {},
            body: form
        });

        return promise.then((responseJson) => responseJson);
    },

    findIcon: (fileCd) => {
        const promise = getPromise({
            url: `menu/icon-${fileCd}`,
            method: 'GET'
        });

        return promise.then(responseJson => responseJson);
    }
}

export default menu;