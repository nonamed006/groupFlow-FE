import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RealGrid from "../RealGrid";
import api from "api/Fetch";

const TotalMenuBox = ({ rgCd, setCheckedMenuCd }) => {
    const [menuList, setMenuList] = useState([]);
    useEffect(() => {
        fetchMenuList();
    }, [])

    // 메뉴 전체 조회 + 권한그룹의 메뉴일 경우 체크여부 포함
    const fetchMenuList = async () => {
        let res = await api.roleMenu.getMenuListWithRole(rgCd);
        if ( res.status === 200 ) {
            setMenuList(res.data);
            let menuCds = [];
            res.data &&
                res.data.forEach(element => {
                    if (element.state === 'true')
                        menuCds.push(element.menuCd);
                });
            setCheckedMenuCd(menuCds);
        } else{
            setMenuList();
            setCheckedMenuCd();
        }
    }
    return (
        <Box borderRadius="lg" bg="white" h="fit-content" display={'flex'} px="6">
            <RealGrid type={'modify'} org={menuList} setCheckedMenuCd={setCheckedMenuCd} />
        </Box>
    );
};

export default TotalMenuBox;
