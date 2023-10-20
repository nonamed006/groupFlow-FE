import { Grid, GridItem } from "@chakra-ui/react";
import { React, useState } from "react";
import RoleGrpBox from "./component/Corp/RoleGrpBox/RoleGrpBox";
import MenuBox from "views/admin/roleGroup/component/MenuBox/MenuBox";
import CorpList from "./component/Corp/CorpList/CorpList";

const RoleCorp = () => {
    const [rgCd, setRgCd] = useState(); // 선택한 권한그룹 코드
    const [coCd, setCoCd] = useState(); // 선택한 회사코드
    const [keyword, setKeyword] = useState();   // 권한그룹 검색어

    return (

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
                    rgCd={rgCd} // 선택되는 권한그룹 코드
                    type={'corp'}   // 권한맵핑 기준
                    code={coCd} // 회사/부서/조직 코드
                    grpNm={keyword} // 검색할 권한그룹명
                    modify={false}
                />
            </GridItem>
        </Grid>
    );
};

export default RoleCorp;
