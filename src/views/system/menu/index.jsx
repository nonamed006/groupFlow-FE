import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import SearchCardBar from './component/SearchCardBar';
import GnbCard from './component/GnbCard/GnbCard';
import LnbGrid from './component/LnbGrid/LnbGrid';
import InfoBox from './component/InfoBox/InfoBox';
import CommonAlert from 'common/component/CommonAlert';
import Loading from 'common/Loading';

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
	const [ isEditing, setIsEditing ] = useState(false);			// 수정모드
	const [ isSave, setIsSave ] = useState(false);					// 저장됐는지 구분
	const [ isLoading, setIsLoading ] = useState(false);			// 로딩

	const reset = () => {
		setMenuInfo({
			menuCd: '',
			upperCd: '',
			fileCd: '',
			menuNm: '',
			useYn: true,
			sort : '',
			depth : '',
			typeCd: '',
			menuPath : '',
			delYn : 0,
		});
	}

	const isEditingReset = () => {
		setIsEditing(false);
		setSelectGnbMenuCd('');
		reset();
	}

	useEffect(() => {
		isEditingReset();
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
				templateRows='repeat(16, 1fr)'
				templateColumns='repeat(8, 1fr)'
				gap={3}
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
						setAlertInfo={setAlertInfo}
						isEditingReset={isEditingReset}
						setIsLoading={setIsLoading}
					/>
                </GridItem>
				<GridItem colSpan={3} rowSpan={5}>
                    <LnbGrid
						title={'메뉴목록'}
						menuInfo={menuInfo}
						setMenuInfo={setMenuInfo}
						selectGnbMenuCd={selectGnbMenuCd}
						search={search}
						isSave={isSave}
						setIsLoading={setIsLoading}
					/>
                </GridItem>
				<GridItem colSpan={3} rowSpan={5} >
					<InfoBox
						title={menuInfo.upperCd ? '메뉴 정보' : '대메뉴 정보'}
						menuInfo={menuInfo}
						setMenuInfo={setMenuInfo}
						setAlertInfo={setAlertInfo}
						isEditing={isEditing}
						setIsEditing={setIsEditing}
						isEditingReset={isEditingReset}
						isSave={isSave}
						setIsSave={setIsSave}
						setIsLoading={setIsLoading}
					/>
                </GridItem>
			</Grid>
            {alertInfo.isOpen &&
				<CommonAlert
					alertInfo={alertInfo}
					setAlertInfo={setAlertInfo}
				/>
			}
			{isLoading && <Loading />}
		</Box>
	);
};

export default Menu;