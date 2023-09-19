import { Box, Grid, GridItem, Button, useDisclosure } from '@chakra-ui/react';

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import OrgList from './OrgList';
import DepGrpCardList from './DepGrpCardList';
import DepGrpInfo from './DepGrpInfo';

const OrgChartBox = () => {
    const [depGrp,setDepGrp] = useState();  // 선택된 조직_그룹 데이터 하나

    return (

        <Box bg='white' w='auto'>
            <Grid
                h='auto'
                templateColumns='repeat(4, 1fr)'
                gap={4}
                p={3}
            >
                {/* 검색바 */}
                <GridItem colSpan={4}   >
                    <SearchBar />
                </GridItem>
                {/* 조직도 그리드 */}
                <GridItem colSpan={1} rowSpan={5} >
                    <OrgList />
                </GridItem>
                {/* 사원 목록 */}
                <GridItem colSpan={2} rowSpan={5} >
                    <DepGrpCardList setDepGrp={setDepGrp}/>
                </GridItem>
                {/* 사원 정보 */}
                <GridItem colSpan={1} rowSpan={5} >
                    <DepGrpInfo depGrp={depGrp!==undefined&&depGrp} />
                </GridItem>
            </Grid>
        </Box>
    );
};

export default OrgChartBox;
