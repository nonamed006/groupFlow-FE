import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import SearchCardBar from './component/SearchCardBar';
import GnbCard from './component/GnbCard/GnbCard';
import LnbGrid from './component/LnbGrid/LnbGrid';
import InfoBox from './component/InfoBox/InfoBox';
import CommonAlert from 'common/component/CommonAlert';

/*
남은 작업 : 
	1. 하위메뉴 수정 후 목록 새로고침
	2. 파일 업로드(아이콘)
*/
const Menu = () => {
	const [ gnbMenuList, setGnbMenuList ] = useState([]);			// GNB 메뉴 목록
	const [ menuInfo, setMenuInfo ] = useState({});					// 선택한 메뉴 정보
	const [ search, setSearch ] = useState({
		searchGnbMenuCd: '',
		searchLnbMenuCd: '',
		searchMenuNm: '',
		onSearchClick: false
	});

    const [ alertInfo, setAlertInfo ] = useState({
        isOpen: false
    })

	const [ selectGnbMenuCd, setSelectGnbMenuCd ] = useState('');	// GNB 선택

	useEffect(() => {
		setMenuInfo({});
		setSelectGnbMenuCd('');
	}, [search.onSearchClick]);

	useEffect(() => {
		setSearch({
			...search,
			searchLnbMenuCd: ''
		})
	}, [search.searchGnbMenuCd])

	return (
		<Box h={'full'}>
			<Grid
				h={'full'}
				templateRows='repeat(11, 1fr)'
				templateColumns='repeat(8, 1fr)'
				gap={5}
			>
				<GridItem colSpan={8} rowSpan={1} >
                    <SearchCardBar
						gnbMenuList={gnbMenuList}
						search={search}
						setSearch={setSearch}
					/>
                </GridItem>
				<GridItem colSpan={2} rowSpan={5} >
                    <GnbCard
						title={'대메뉴'}
						menuInfo={menuInfo}
						selectGnbMenuCd={selectGnbMenuCd}
						setMenuInfo={setMenuInfo}
						setGnbMenuList={setGnbMenuList}
						setSelectGnbMenuCd={setSelectGnbMenuCd}
						search={search}
					/>
                </GridItem>
				<GridItem colSpan={3} rowSpan={5}>
                    <LnbGrid
						title={'메뉴목록'}
						menuInfo={menuInfo}
						setMenuInfo={setMenuInfo}
						selectGnbMenuCd={selectGnbMenuCd}
						search={search}
					/>
                </GridItem>
				<GridItem colSpan={3} rowSpan={5} >
					<InfoBox
						title={menuInfo.upperCd ? '메뉴 정보' : '대메뉴 정보'}
						menuInfo={menuInfo}
						selectGnbMenuCd={selectGnbMenuCd}
						setMenuInfo={setMenuInfo}
						setAlertInfo={setAlertInfo}
					/>
                </GridItem>
			</Grid>
            {alertInfo.isOpen &&
				<CommonAlert
					alertInfo={alertInfo}
					setAlertInfo={setAlertInfo}
				/>
			}
		</Box>
	);
};

export default Menu;