import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

import SearchBar from "./SearchBar";
import MenuTab from "./MenuTab";
import MenuList from "./MenuList";
import TotalMenuModal from "./TotalMenuModal";


const MenuBox = ({rgCd}) => {
    const [keyword, setKeyword] = useState();   // 검색어(메뉴명)
    const [selectedMenu, setSelectedMenu] = useState(); // 검색바에서 선택된 대메뉴
    const [changeEdit, setChangeEdit] = useState(false);
    const [typeCd, setTypeCd] = useState();
    
    const [isOpen, setIsOpen] = useState(false);    // 권한메뉴 수정 모달

    // 검색 버튼 클릭 시
    const handelSearchBtn = () => {
        // 검색 내용에 따른 목록 조회
        setChangeEdit(true);
    };

    const changeTypeTab =(typeCd)=>{ 
        initSearchBar();
        setTypeCd(typeCd);
    }
    
    const initSearchBar = ()=> {
        setSelectedMenu(undefined);
        setKeyword(undefined);
    }

    return (
        <Box bg='white' borderRadius="lg" h="700px" p="6" backgroundColor="white" >
            {/* 메뉴 상단 */}
            <MenuTab setIsOpen={setIsOpen} changeTypeTab={changeTypeTab} typeCd={typeCd}/>
            {/* 검색창 */}
            <SearchBar changeEdit={changeEdit} selectedMenu={selectedMenu} rgCd={rgCd} typeCd={typeCd} handelSearchBtn={handelSearchBtn} setKeyword={setKeyword} setSelectedMenu={setSelectedMenu}/>
            {/* 메뉴리스트 */}
            <MenuList rgCd={rgCd} typeCd={typeCd} changeEdit={changeEdit} setChangeEdit={setChangeEdit} keyword={keyword} selectedMenu={selectedMenu}/>

            {/* 수정버튼 클릭 시 권한메뉴 모달창 */}
            <TotalMenuModal isOpen={isOpen} setIsOpen={setIsOpen} setChangeEdit={setChangeEdit} rgCd={rgCd} />
        </Box>
        
    );
};

export default MenuBox;
