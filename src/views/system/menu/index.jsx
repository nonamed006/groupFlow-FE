import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import SearchCardBar from './component/SearchCardBar';
import GnbCard from './component/GnbCard/GnbCard';
import LnbGrid from './component/LnbGrid/LnbGrid';
import InfoBox from './component/InfoBox/InfoBox';
import { useSelector } from 'react-redux';

const Menu = () => {
	const [ menuList, setMenuList ] = useState([]);
	const [ menuInfo, setMenuInfo ] = useState({});
	const [ searchGnbMenuCd, setSearchGnbMenuCd ] = useState('');
	const [ searchLnbMenuCd, setSearchLnbMenuCd ] = useState('');
	const [ searchMenuNm, setSearchMenuNm ] = useState('');
	const [ onSearchClick, setOnSearchClick ] = useState('');

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
						menuList={menuList}
						searchGnbMenuCd={searchGnbMenuCd}
						searchLnbMenuCd={searchLnbMenuCd}
						searchMenuNm={searchMenuNm}
						setSearchGnbMenuCd={setSearchGnbMenuCd}
						setSearchLnbMenuCd={setSearchLnbMenuCd}
						setSearchMenuNm={setSearchMenuNm}
						onSearchClick={onSearchClick}
						setOnSearchClick={setOnSearchClick}
					/>
                </GridItem>
				<GridItem colSpan={2} rowSpan={5} >
                    <GnbCard
						title={'대메뉴'}
						menuInfo={menuInfo}
						setMenuInfo={setMenuInfo}
						setMenuList={setMenuList}
						searchGnbMenuCd={searchGnbMenuCd}
						searchMenuNm={searchMenuNm}
						onSearchClick={onSearchClick}
					/>
                </GridItem>
				<GridItem colSpan={2} rowSpan={5} >
                    <LnbGrid
						title={'메뉴목록'}
					/>
                </GridItem>
				<GridItem colSpan={4} rowSpan={5} >
                    <InfoBox
						title={menuInfo ? '대메뉴 정보' : '메뉴 정보'}
						menuInfo={menuInfo}
						setMenuInfo={setMenuInfo}
					/>
                </GridItem>
			</Grid>
		</Box>
	);
};

export default Menu;