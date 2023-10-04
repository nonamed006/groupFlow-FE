import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import SearchCardBar from './component/SearchCardBar';
import GnbCard from './component/GnbCard/GnbCard';
import LnbGrid from './component/LnbGrid/LnbGrid';
import InfoBox from './component/InfoBox/InfoBox';
import LnbInfoBox from './component/LnbInfoBox/InfoBox';
import { useSelector } from 'react-redux';

/*
남은 작업 : 
	1. 하위메뉴 수정 후 목록 새로고침
	2. 파일 업로드(아이콘)
	3. 상위 메뉴 변경
*/
const Menu = () => {
	const [ gnbMenuList, setGnbMenuList ] = useState([]);			// GNB 메뉴 목록
	const [ menuInfo, setMenuInfo ] = useState({});					// 선택한 메뉴 정보
	// const [ lnbMenuList, setLnbMenuList ] = useState([]);		// LNB 메뉴 목록
	const [ search, setSearch ] = useState({
		searchGnbMenuCd: '',
		searchLnbMenuCd: '',
		searchMenuNm: '',
		onSearchClick: false
	});
	// const [ searchGnbMenuCd, setSearchGnbMenuCd ] = useState('');	// GNB 검색
	// const [ searchLnbMenuCd, setSearchLnbMenuCd ] = useState('');	// LNB 검색
	// const [ searchMenuNm, setSearchMenuNm ] = useState('');			// 메뉴명 검색
	// const [ onSearchClick, setOnSearchClick ] = useState('');		// 검색 버튼 클릭
	const [ selectGnbMenuCd, setSelectGnbMenuCd ] = useState('');	// GNB 선택

	useEffect(() => {
		setMenuInfo({});
		setSelectGnbMenuCd('');
		setSearch({
			...search,
			searchLnbMenuCd: ''
		})
	}, [search.onSearchClick]);

	return (
		<Box pt={{ base: '130px', md: '130px', xl: '120px' }}>
			<Grid
				h='full'
				templateRows='repeat(11, 1fr)'
				templateColumns='repeat(8, 1fr)'
				gap={5}
			>
				<GridItem colSpan={8} rowSpan={1} >
                    <SearchCardBar
						gnbMenuList={gnbMenuList}
						search={search}
						setSearch={setSearch}
						// searchGnbMenuCd={searchGnbMenuCd}
						// searchLnbMenuCd={searchLnbMenuCd}
						// searchMenuNm={searchMenuNm}
						// setSearchGnbMenuCd={setSearchGnbMenuCd}
						// setSearchLnbMenuCd={setSearchLnbMenuCd}
						// setSearchMenuNm={setSearchMenuNm}
						// onSearchClick={onSearchClick}
						// setOnSearchClick={setOnSearchClick}
					/>
                </GridItem>
				<GridItem colSpan={2} rowSpan={5} >
                    <GnbCard
						title={'대메뉴'}
						//gnbMenuInfo={gnbMenuInfo}
						menuInfo={menuInfo}
						//setGnbMenuInfo={setGnbMenuInfo}
						selectGnbMenuCd={selectGnbMenuCd}
						setMenuInfo={setMenuInfo}
						setGnbMenuList={setGnbMenuList}
						setSelectGnbMenuCd={setSelectGnbMenuCd}
						search={search}
						// searchGnbMenuCd={searchGnbMenuCd}
						// searchMenuNm={searchMenuNm}
						// onSearchClick={onSearchClick}
					/>
                </GridItem>
				<GridItem colSpan={3} rowSpan={5}>
                    <LnbGrid
						title={'메뉴목록'}
						//gnbMenuInfo={gnbMenuInfo}
						//lnbMenuInfo={lnbMenuInfo}
						menuInfo={menuInfo}
						//setLnbMenuInfo={setLnbMenuInfo}
						setMenuInfo={setMenuInfo}
						//setLnbMenuList={setLnbMenuList}
						selectGnbMenuCd={selectGnbMenuCd}
						search={search}
						// searchGnbMenuCd={searchGnbMenuCd}
						// searchLnbMenuCd={searchLnbMenuCd}
						// searchMenuNm={searchMenuNm}
						// onSearchClick={onSearchClick}
					/>
                </GridItem>
				<GridItem colSpan={3} rowSpan={5} >
					{
						menuInfo.upperCd ?
						<LnbInfoBox
							title={'메뉴 정보'}
							menuInfo={menuInfo}
							setMenuInfo={setMenuInfo}
						/>
						:
						<InfoBox
							title={'대메뉴 정보'}
							menuInfo={menuInfo}
							setMenuInfo={setMenuInfo}
						/>
					}
                </GridItem>
			</Grid>
		</Box>
	);
};

export default Menu;