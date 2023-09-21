import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import SearchCardBar from './component/SearchCardBar';
import GnbCard from './component/GnbCard/GnbCard';
import LnbGrid from './component/LnbGrid/LnbGrid';
import InfoBox from './component/InfoBox/InfoBox';
import { useSelector } from 'react-redux';

const Menu = () => {
	const { menu } = useSelector(state => state.menu);
	console.log(menu);

	return (
		<Box pt={{ base: '130px', md: '130px', xl: '120px' }}>
			<Grid
				h='full'
				templateRows='repeat(11, 1fr)'
				templateColumns='repeat(8, 1fr)'
				gap={5}
			>
				<GridItem colSpan={8} rowSpan={1} >
                    <SearchCardBar/>
                </GridItem>
				<GridItem colSpan={2} rowSpan={5} >
                    <GnbCard title={'대메뉴'}/>
                </GridItem>
				<GridItem colSpan={2} rowSpan={5} >
                    <LnbGrid title={'메뉴목록'}/>
                </GridItem>
				<GridItem colSpan={4} rowSpan={5} >
                    <InfoBox title={Object.keys(menu).length !== 0 ? '대메뉴 정보' : '메뉴 정보'}/>
                </GridItem>
			</Grid>
		</Box>
	);
};

export default Menu;