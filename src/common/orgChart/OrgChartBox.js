import { Box, Grid, GridItem, Button, useDisclosure } from '@chakra-ui/react';

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import OrgList from './OrgList';
import DepGrpCardList from './DepGrpCardList';
import DepGrpInfo from './DepGrpInfo';
import { PORT } from "set";

const OrgChartBox = () => {
    const [depGrp, setDepGrp] = useState();  // 선택된 부서원 데이터 하나
    const [search, setSearch] = useState(''); // 검색 기준
    const [keyword, setKeyword] = useState('');   // 검색어
    const [corpDepCd, setCorpDepCd] = useState();
    const [corpDepList, setCorpDepList] = useState();  // 회사 및 부서 목록
    const [changeYn, setChangeYn] = useState(); // 첫로딩, 검색시 초기화
    useEffect(() => {
        fetchCorpDepList(); // 회사 및 부서 목록 조회
    }, []);


    // 검색 버튼 클릭 시
    const handleSearchBtn = () => {
        console.log('dddddd');
        if (keyword.length > 0 && search == '') {
            alert("검색기준을 선택하세요");
        } else {
            setChangeYn(!changeYn);
            setCorpDepCd();
            setDepGrp();
        }
    }

    // 회사 및 부서 목록 조회
    const fetchCorpDepList = () => {
        let url = `${PORT}/roleEmp/list?empYn=N`;
        fetch(url, {
            method: "GET"
        }).then(res => res.json()).then(res => {
            setCorpDepList(res.data);
        });
    };

    // 조직도 그리드 클릭 시
    const handelGridCd = (corpDepCd) => {
        console.log('ddd');
        setCorpDepCd(corpDepCd);
        setDepGrp();
        setChangeYn(!changeYn);
    };

    return (

        <Box bg='white' w='auto'>
            <Grid
                h='auto'
                templateColumns='repeat(4, 1fr)'
                gap={4}
            >
                {/* 검색바 */}
                <GridItem colSpan={4}   >
                    <SearchBar setSearch={setSearch} setKeyword={setKeyword} handleSearchBtn={handleSearchBtn} />
                </GridItem>
                {/* 조직도 그리드 */}
                <GridItem colSpan={1} rowSpan={5} >
                    <OrgList handelGridCd={handelGridCd} corpDepList={corpDepList} />
                </GridItem>
                {/* 사원 목록 */}
                <GridItem colSpan={2} rowSpan={5} >
                    <DepGrpCardList changeYn={changeYn} corpDepCd={corpDepCd} search={search} keyword={keyword} setDepGrp={setDepGrp} />
                </GridItem>
                {/* 사원 정보 */}
                <GridItem colSpan={1} rowSpan={5} >
                    <DepGrpInfo depGrp={depGrp} />
                </GridItem>
            </Grid>
        </Box>
    );
};

export default OrgChartBox;
