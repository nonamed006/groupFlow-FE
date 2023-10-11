import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { PORT } from "set";
import RealGrid from "../RealGrid";

const MenuList = ({ typeCd, rgCd, changeEdit, setChangeEdit, selectedMenu, keyword, coCd }) => {
    const [roleMenu, setRoleMenu] = useState();  // 권한 메뉴 목록

    useEffect(() => {
        if((rgCd !== undefined && rgCd !=='undefined'))
            changeEdit? setChangeEdit(false) : fetchRoleMenu();
    }, [rgCd, changeEdit, typeCd]);

    useEffect(()=>{
        setRoleMenu();
    },[coCd]);
    // 권한메뉴 목록 조회 + 검색
    const fetchRoleMenu = () => {
        let url = `${PORT}/roleMenu/${rgCd}`
        console.log(rgCd);
        // URL 파라미터 생성
        const params = new URLSearchParams();
        if (selectedMenu !== undefined && selectedMenu !== 'undefined') 
            params.append("gnb", selectedMenu);
        if (keyword !== undefined && keyword !== 'undefined') 
            params.append("keyword", keyword);
        if (typeCd !== undefined && typeCd !== 'undefined') 
            params.append("typeCd", typeCd);

        // URL에 파라미터 추가
        const paramString = params.toString();
        if (paramString) {
            url += "?" + paramString;
        }

        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                setRoleMenu(res.data);
            });
    };

    return (
        <Box borderRadius="lg" bg="white" h="fit-content" px={5} >
            {(rgCd !== 'undefined' && rgCd !== undefined) &&
                roleMenu &&
                <RealGrid org={roleMenu} />
            }
        </Box>
    );
};

export default MenuList;
