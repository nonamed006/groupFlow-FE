import { Box, MenuList } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import SearchBar from "./SearchBar";
import MenuTab from "./MenuTab";
import { PORT } from "set";


const MenuBox = ({rgCd}) => {
    const [keyword, setKeyword] = useState();   // 검색어(메뉴명)
    const [selectedMenu, setSelectedMenu] = useState(); // 검색바에서 선택된 대메뉴
    const [roleMenu, setRoleMenu] = useState();  // 권한 메뉴 목록

    useEffect(() => {

    }, []);

    // 권한메뉴 목록 조회 + 검색
    const fetchRoleMenu = () => {
        let url = `${PORT}/roleMenu`

        // URL 파라미터 생성
        const params = new URLSearchParams();
        if (selectedMenu !== "undefined" && selectedMenu !== undefined)
            params.append("menu", selectedMenu);
        if (keyword !== "undefined" && keyword !== undefined)
            params.append("keyword", keyword);
        // URL에 파라미터 추가
        const paramString = params.toString();
        if (paramString) {
            url += "?" + paramString;
        }

        // fetch(url, {
        // 	method: "GET",
        // })
        // 	.then((res) => res.json())
        // 	.then((res) => {
        // 		setRoleGrpList(res.data);
        // 	});
    };

    // 검색 버튼 클릭 시
    const handelSearchBtn = () => {
        // 검색 내용에 따른 목록 조회
    };
    return (
        <Box bg='white' borderRadius="lg" h="700px" p="6" backgroundColor="white" >
            {/* 메뉴 상단 */}
            <MenuTab rgCd={rgCd}/>
            {/* 검색창 */}
            <SearchBar handelSearchBtn={handelSearchBtn} setKeyword={setKeyword} setSelectedMenu={setSelectedMenu}/>
            {/* 메뉴리스트 */}
            {/* <MenuList list={list} roleMenu={roleMenu}/> */}
        </Box>
    );
};

export default MenuBox;
