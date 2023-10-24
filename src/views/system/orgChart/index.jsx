import { Box, Grid, GridItem } from '@chakra-ui/react';

import React, { useState, useEffect } from "react";
import SearchBarOrga from "./compoment/SearchBarOrga";
import OrgList from './compoment/orgList/OrgList';
import DepGrpCardList from './compoment/depGrpList/DepGrpCardList';
import DepGrpInfo from './compoment/depGrpInfo/DepGrpInfo';
import { PORT } from "set";
import CommonAlert from 'common/component/CommonAlert';
import Loading from 'common/Loading';

const OrgChartBox = () => {
    const [depGrp, setDepGrp] = useState();  // 선택된 부서원 데이터 하나
    const [search, setSearch] = useState(''); // 검색 기준
    const [keyword, setKeyword] = useState('');   // 검색어
    const [corpDep, setCorpDep] = useState();
    const [corpDepList, setCorpDepList] = useState();  // 회사 및 부서 목록
    const [changeYn, setChangeYn] = useState(); // 첫로딩, 검색시 초기화

    const [alertInfo, setAlertInfo] = useState({ isOpen: false });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCorpDepList(); // 회사 및 부서 목록 조회
    }, []);


    // 검색 버튼 클릭 시
    const handleSearchBtn = () => {
        if (keyword.length > 0 && search === '') {
            setAlertInfo({
                isOpen: true,
                status: 'warning',
                detail: '검색기준을 선택하세요',
                width: 'fit-content'
            });
        } else {
            setChangeYn(true);
            setCorpDep({ code: undefined, name: '검색결과' });
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
            setIsLoading(false);
        });
    };

    // 조직도 그리드 클릭 시
    const handleGrid = (corpDep) => {
        setCorpDep(corpDep);
        setDepGrp();
        setChangeYn(true);
    };

    return (
        <>
            <Box bg='white' minH={'720px'} overflowY={'inherit'}>
                {isLoading ?
                    <Loading />
                    :

                    <Grid
                        templateColumns='repeat(4, 1fr)'
                        gap={4}
                    >
                        {/* 검색바 */}
                        <GridItem colSpan={4}   >
                            <SearchBarOrga corpDep={corpDep} setSearch={setSearch} setKeyword={setKeyword} handleSearchBtn={handleSearchBtn} />
                        </GridItem>
                        {/* 조직도 그리드 */}
                        <GridItem colSpan={1} rowSpan={5} >
                            <OrgList handleGrid={handleGrid} corpDepList={corpDepList} />
                        </GridItem>
                        {/* 사원 목록 */}
                        <GridItem colSpan={2} rowSpan={5} >
                            <DepGrpCardList setChangeYn={setChangeYn} changeYn={changeYn} corpDep={corpDep && corpDep} search={search} keyword={keyword} setDepGrp={setDepGrp} />
                        </GridItem>
                        {/* 사원 정보 */}
                        <GridItem colSpan={1} rowSpan={5} >
                            <DepGrpInfo depGrp={depGrp} />
                        </GridItem>
                    </Grid>
                }
            </Box>
            {
                alertInfo.isOpen &&
                <CommonAlert alertInfo={alertInfo} setAlertInfo={setAlertInfo} />
            }
        </>
    );
};

export default OrgChartBox;
