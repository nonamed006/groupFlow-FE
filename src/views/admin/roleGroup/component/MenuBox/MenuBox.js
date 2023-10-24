import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PORT } from "set";

import SearchBar from "./SearchBarMenu";
import MenuTab from "./MenuTab";
import MenuList from "./MenuList";
import TotalMenuModal from "./TotalMenuModal";
import api from "api/Fetch";

const MenuBox = ({ rgCd, type, modify, code, grpNm }) => {
    const [keyword, setKeyword] = useState();   // 검색어(메뉴명)
    const [selectedMenu, setSelectedMenu] = useState(); // 검색바에서 선택된 대메뉴
    const [changeEdit, setChangeEdit] = useState(false);
    const [typeCd, setTypeCd] = useState();
    const [roleMenu, setRoleMenu] = useState();  // 권한 메뉴 목록
    const [menuList, setMenuList] = useState();// 대메뉴 목록 (셀렉트박스에서 사용됨)

    const [isOpen, setIsOpen] = useState(false);    // 권한메뉴 수정 모달

    useEffect(() => {
        setRoleMenu();
        setMenuList();
    }, [code]);

    useEffect(() => {
        setRoleMenu();
        setMenuList();
        changeTypeTab(undefined);
    }, [rgCd])

    // 검색 버튼 클릭 시
    const handleSearchBtn = () => {
        // 검색 내용에 따른 목록 조회
        setChangeEdit(true);
    };

    const changeTypeTab = (typeCd) => {
        setSelectedMenu(undefined);
        setKeyword(undefined);
        setTypeCd(typeCd);
        setChangeEdit(true);
    }

    // 대메뉴 이름/코드 목록 조회
    const fetchMenuList = async () => {
        let res = await api.roleMenu.getRoleMenuGnbList(rgCd, type, code, grpNm, typeCd);
        if (res.status === 200) setMenuList(res.data);
        else setMenuList([]);
    }

    // 권한메뉴 목록 조회 + 검색
    const fetchRoleMenu = async () => {
        let res = await api.roleMenu.getRoleMenuList(rgCd, type, code, grpNm, selectedMenu, keyword, typeCd);
        if (res.status === 200) setRoleMenu(res.data);
        else setRoleMenu();
    };

    return (
        <Box bg='white' borderRadius="lg" h="700px" p="6" backgroundColor="white" >
            {/* 메뉴 상단 */}
            <MenuTab setIsOpen={setIsOpen} changeTypeTab={changeTypeTab} typeCd={typeCd} modify={modify} />
            {/* 검색창 */}
            <SearchBar
                menuList={menuList}
                fetchMenuList={fetchMenuList}
                rgCd={rgCd}
                typeCd={typeCd}
                handleSearchBtn={handleSearchBtn}
                setKeyword={setKeyword}
                setSelectedMenu={setSelectedMenu}

            />
            {/* 메뉴리스트 */}
            <MenuList
                rgCd={rgCd}
                changeEdit={changeEdit}
                setChangeEdit={setChangeEdit}
                fetchRoleMenu={fetchRoleMenu}
                roleMenu={roleMenu}
            />

            {/* 수정버튼 클릭 시 권한메뉴 모달창 */}
            <TotalMenuModal isOpen={isOpen} setIsOpen={setIsOpen} setChangeEdit={setChangeEdit} rgCd={rgCd} />
        </Box>

    );
};

export default MenuBox;
