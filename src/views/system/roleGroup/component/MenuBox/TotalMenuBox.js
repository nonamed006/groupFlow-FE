import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RealGrid from "../RealGrid";
import api from "api/Fetch";
import Loading from "common/Loading";

const TotalMenuBox = ({ rgCd, setCheckedMenuCd, typeCd }) => {
    const [menuList, setMenuList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchMenuList();
    }, [rgCd])

    // 메뉴 전체 조회 + 권한그룹의 메뉴일 경우 체크여부 포함
    const fetchMenuList = async () => {
        setIsLoading(true);
        let res = await api.roleMenu.getMenuListWithRole(rgCd, typeCd);
        if (res.status === 200) {
            setMenuList(res.data);
            let menuCds = [];
            res.data &&
                res.data.forEach(element => {
                    if (element.state === 'true')
                        menuCds.push(element.menuCd);
                });
            setCheckedMenuCd(menuCds);
        } else {
            setMenuList();
            setCheckedMenuCd();
        }
        setIsLoading(false);
    }
    return (
        <Box borderRadius="lg" bg="white" h="fit-content" display={'flex'} px="9" >
            {isLoading ?
                <Loading />
                :
                menuList.length > 0 ?
                    <RealGrid type={'modify'} org={menuList} setCheckedMenuCd={setCheckedMenuCd} />
                    :
                    <Text
                        pt={200}
                        align={'center'}
                        fontWeight={600}
                        color={'lightgray'}
                        fontSize={'18px'}
                    >
                        검색된 데이터가 없습니다.</Text>
            }
        </Box>
    );
};

export default TotalMenuBox;
