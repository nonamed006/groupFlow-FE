import { Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DepList from './component/dep/depList/DepList';
import DepGrpBox from './component/dep/depGrpBox.js/DepGrpBox';
import { PORT } from 'set';
import MenuBox from 'views/system/roleGroup/component/MenuBox/MenuBox';

const DepRole = () => {
    const [rgCd, setRgCd] = useState(); // 선택한 권한그룹 코드
    const [coCd, setCoCd] = useState(); // 선택한 회사코드
    const [keyword, setKeyword] = useState();   // 권한그룹 검색어
    const [dpCd, setDpCd] = useState(); // 선택한 부서코드

    const [dpCdList, setDpCdList] = useState([]);

    
    return (
        <Grid
            h="500px"
            templateRows="repeat(11, 1fr)"
            templateColumns="repeat(7, 1fr)"
            gap={5}
        >

            {/* 부서 목록 */}
            <GridItem colSpan={2} rowSpan={5}>
                <DepList 
                    setDpCd={setDpCd}
                    setCoCd={setCoCd}
                    //fetchRoleGroup={fetchRoleGroup}
                    // setIsReload={setIsReload}
                    setDpCdList={setDpCdList}
                />
            </GridItem>
            {/* 권한그룹 목록 */}
            <GridItem colSpan={2} rowSpan={5}>
                <DepGrpBox 
                    setRgCd = {setRgCd}
                    dpCd={dpCd}
                    setDpCd={setDpCd}
                    setKeyword={setKeyword}
                    coCd={coCd}
                    // roleGrpList={roleGrpList}
                    // totalCount={totalCount}
                    // handleSearchBtn={handleSearchBtn}
                    // checkedList={checkedList}
                    // setCheckedList={setCheckedList}
                    // dpCdList={dpCdList}
                    // setIsReload={setIsReload}
                    // isReload={isReload}
                />
            </GridItem>
            {/* 메뉴 목록 */}
            <GridItem colSpan={3} rowSpan={5}>
                <MenuBox
                    rgCd={rgCd} // 선택되는 권한그룹 코드
                    type={'dpCd'}   // 권한맵핑 기준
                    code={dpCd} // 회사/부서/조직 코드
                    grpNm={keyword} // 검색할 권한그룹명
                    modify={false}
                />
            </GridItem>
        </Grid>
    );
};

export default DepRole;