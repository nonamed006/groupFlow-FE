import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import RoleGrpBox from "./component/Corp/RoleGrpBox/RoleGrpBox";
import MenuBox from "views/admin/roleGroup/component/MenuBox/MenuBox";
import CorpList from "./component/Corp/CorpList/CorpList";


const RoleCorp = () => {
    const [rgCd, setRgCd] = useState(); // 선택한 권한그룹 코드
    const [coCd, setCoCd] = useState(); // 선택한 회사 코드
    const [keyword, setKeyword] = useState();   // 권한그룹 검색어
    
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Grid
                h="500px"
                templateRows="repeat(11, 1fr)"
                templateColumns="repeat(7, 1fr)"
                gap={5}
            >

                {/* 회사 목록 */}
                <GridItem colSpan={2} rowSpan={5}>
                    <CorpList
                        setCoCd={setCoCd}
                        coCd={coCd}
                    />
                </GridItem>
                {/* 권한그룹 목록 */}
                <GridItem colSpan={2} rowSpan={5}>
                    <RoleGrpBox
                        keyword={keyword}
                        setKeyword={setKeyword}
                        coCd={coCd}
                        rgCd={rgCd}
                        setRgCd={setRgCd}
                    />
                </GridItem>
                {/* 메뉴 목록 */}
                <GridItem colSpan={3} rowSpan={5}>
                    <MenuBox
                        rgCd={rgCd}
                        coCd={coCd}
                        grpNm={keyword}
                    />
                </GridItem>
            </Grid>

        </Box>
    );
};

export default RoleCorp;
