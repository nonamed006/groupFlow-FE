import { Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import DepList from './depList/DepList';
import DepGrpBox from './depGrpBox.js/DepGrpBox';

const DepRole = () => {
    const [keyword, setKeyword] = useState();   // 권한그룹 검색어
    const [dpCd, setDpCd] = useState();
    const [isReload, setIsReload] = useState();

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
                    setIsReload={setIsReload}
                    isReload={isReload}
                />
            </GridItem>
            {/* 권한그룹 목록 */}
            <GridItem colSpan={2} rowSpan={5}>
                <DepGrpBox 
                    dpCd={dpCd}
                    setDpCd={setDpCd}
                    setKeyword={setKeyword}
                    isReload={isReload}
                    setIsReload={setIsReload}
                />
            </GridItem>
            {/* 메뉴 목록 */}
            <GridItem colSpan={3} rowSpan={5}>
                asd
            </GridItem>
        </Grid>
    );
};

export default DepRole;