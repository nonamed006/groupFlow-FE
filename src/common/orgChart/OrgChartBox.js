import { Box, Grid, GridItem, Button, useDisclosure } from '@chakra-ui/react';

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import OrgList from './OrgList';
import DepGrpCardList from './DepGrpCardList';
import DepGrpInfo from './DepGrpInfo';
import { PORT } from "set";

const OrgChartBox = () => {
    const [depGrp,setDepGrp] = useState();  // 선택된 조직_그룹 데이터 하나
    const [search, setSearch] = useState(''); // 검색 기준
    const [keyword, setKeyword] = useState('');   // 검색어
    const [corpDepList, setCorpDepList] =  useState();  // 회사 및 부서 목록
	useEffect(() => {
		fetchCorpDepList();
	}, []);


    // 검색 버튼 클릭 시
	const handleSearchBtn = () => {
        fetchCorpDepList();
	}

    // 회사 및 부서 목록 조회/검색
	const fetchCorpDepList = () => {
		let url = `${PORT}/dep/orgList`;

		// URL 파라미터 생성
		const params = new URLSearchParams();
        if (search !== '')
        params.append('search', search);
		if (keyword !== '')
			params.append('keyword', keyword);

		// URL에 파라미터 추가
		const paramString = params.toString();
		if (paramString) {
			url += '?' + paramString;
		}
        console.log('url ===> '+url);
		fetch(url, {
			method: "GET"
		}).then(res => res.json()).then(res => {
            console.log(res.data);
			setCorpDepList(res.data);
		});
	};
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
                    <SearchBar setSearch={setSearch} setKeyword={setKeyword} handleSearchBtn={handleSearchBtn}/>
                </GridItem>
                {/* 조직도 그리드 */}
                <GridItem colSpan={1} rowSpan={5} >
                    <OrgList corpDepList={corpDepList}/>
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
