import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import SearchBar from "./SearchBarMenu";
import MenuTab from "./MenuTab";
import MenuList from "./MenuList";
import TotalMenuModal from "./TotalMenuModal";

const MenuBox = ({ rgCd, type, coCd, grpNm }) => {
    const [keyword, setKeyword] = useState();   // 검색어(메뉴명)
    const [selectedMenu, setSelectedMenu] = useState(); // 검색바에서 선택된 대메뉴
    const [changeEdit, setChangeEdit] = useState(false);
    const [typeCd, setTypeCd] = useState();

    const [isOpen, setIsOpen] = useState(false);    // 권한메뉴 수정 모달

    useEffect(()=>{
        if(selectedMenu !== undefined && selectedMenu !== 'undefined' ){
            setChangeEdit(true);
            initSearchBar();
        }
    },[rgCd]);

    // 검색 버튼 클릭 시
    const handelSearchBtn = () => {
        // 검색 내용에 따른 목록 조회
        setChangeEdit(true);
    };

    const changeTypeTab = (typeCd) => {
        initSearchBar();
        setTypeCd(typeCd);
    }

    const initSearchBar = () => {
        setSelectedMenu(undefined);
        setKeyword(undefined);
    }

    return (
        <Box bg='white' borderRadius="lg" h="700px" p="6" backgroundColor="white" >
            {/* 메뉴 상단 */}
            <MenuTab setIsOpen={setIsOpen} changeTypeTab={changeTypeTab} typeCd={typeCd} type={type} rgCd={rgCd} />
            {/* 검색창 */}
            <SearchBar
                coCd={coCd}
                changeEdit={changeEdit}
                selectedMenu={selectedMenu}
                rgCd={rgCd}
                typeCd={typeCd}
                handelSearchBtn={handelSearchBtn}
                setKeyword={setKeyword}
                setSelectedMenu={setSelectedMenu}
                grpNm={grpNm}
            />
            {/* 메뉴리스트 */}
            <MenuList
                coCd={coCd}
                rgCd={rgCd}
                typeCd={typeCd}
                changeEdit={changeEdit}
                setChangeEdit={setChangeEdit}
                keyword={keyword}
                selectedMenu={selectedMenu} 
                grpNm={grpNm}
                initSearchBar={initSearchBar}
            />

            {/* 수정버튼 클릭 시 권한메뉴 모달창 */}
            <TotalMenuModal isOpen={isOpen} setIsOpen={setIsOpen} setChangeEdit={setChangeEdit} rgCd={rgCd} />
        </Box>

    );
};

export default MenuBox;
