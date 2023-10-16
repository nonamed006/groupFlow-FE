import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import SearchBar from "common/component/SearchBar";


const RoleGrpSearchBar = ({ setKeyword, handleSearchBtn, coCd }) => {

    const formInputRef = useRef(null);

    useEffect(() => {
        if (coCd !== undefined && coCd !== 'undefined') {   // init - 초기화 조건
            // 초기화
            onClearSelect();
            setKeyword();
        }
    }, [coCd]);

    const onClearSelect = () => {
        if (formInputRef.current)
            formInputRef.current.reset();
    }


    return (
        <form ref={formInputRef}>
            <SearchBar setKeyword={setKeyword} handleSearchBtn={handleSearchBtn} placeholder={'권한명을 입력하세요'} btnText={'검색'} />
        </form>

    );
};

export default RoleGrpSearchBar;
