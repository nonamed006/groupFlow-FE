import { Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import DepList from './component/dep/depList/DepList';
import DepGrpBox from './component/dep/depGrpBox.js/DepGrpBox';
import MenuBox from 'views/system/roleGroup/component/MenuBox/MenuBox';


const DepRole = ({tab, setAlertInfo, setIsLoading}) => {
    const [rgCd, setRgCd] = useState(); // 선택한 권한그룹 코드
    const [coCd, setCoCd] = useState(); // 선택한 회사코드
    const [keyword, setKeyword] = useState();   // 권한그룹 검색어
    const [dpCd, setDpCd] = useState(); // 선택한 부서코드

    return (
        <>
        <Grid
            h='500px'
            templateRows="repeat(11, 1fr)"
            templateColumns="repeat(7, 1fr)"
            gap={3}
        >

            {/* 부서 목록 */}
            <GridItem colSpan={2} rowSpan={5}>
                <DepList 
                    tab={tab}
                    setRgCd={setRgCd}
                    setDpCd={setDpCd}
                    setCoCd={setCoCd}
                    setIsLoading={setIsLoading}
                />
            </GridItem>
            {/* 권한그룹 목록 */}
            <GridItem colSpan={2} rowSpan={5}>
                <DepGrpBox 
                    setRgCd={setRgCd}
                    rgCd={rgCd}
                    dpCd={dpCd}
                    setKeyword={setKeyword}
                    coCd={coCd}
                    setIsLoading={setIsLoading}
                    setAlertInfo={setAlertInfo}
                />
            </GridItem>
            {/* 메뉴 목록 */}
            <GridItem colSpan={3} rowSpan={5}>
                <MenuBox
                    rgCd={rgCd} // 선택되는 권한그룹 코드
                    type={'dep'}   // 권한맵핑 기준
                    code={dpCd ? dpCd : coCd} // 회사/부서/조직 코드
                    grpNm={keyword} // 검색할 권한그룹명
                    modify={false}
                    setAlertInfo={setAlertInfo}
                    setIsLoading={setIsLoading}
                />
            </GridItem>
        </Grid>
        </>
    );
};

export default DepRole;