import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from "react";
import { useEffect } from "react";
import SearchCardBar from './component/SearchCardBar';
import GnbCard from './component/GnbCard/GnbCard';
import LnbGrid from './component/LnbGrid/LnbGrid';
import InfoBox from './component/InfoBox/InfoBox';
import { PORT } from 'set';

async function getGnbMenuList() {
	const [ fetchData, setFetchData ] = useState([]);
	await fetch(PORT + '/menu/', { 'method': 'GET'})
		.then((response) => response.json())
		.then((responseJson) => setFetchData(responseJson.data));
	return fetchData;
}

const Menu = () => {
	const [ list, setList ] = useState([]);
	useEffect(async () => {
		setList(await getGnbMenuList());
		// await fetch(PORT + '/menu/', { 'method': 'GET'})
		// 	.then((response) => response.json())
		// 	.then((responseJson) => setList(responseJson.data));
	}, []);
	return (
		//헤더 공간 제외한 div 공간 지정
		/**
		 * h: 그리드 총 높이
		 * templateRows 세로 칸 수
		 * templateColumns 세로 칸 수
		 * gap 마진 비슷 값 클수록 그리드 안의 요소 서로 멀어짐
		 */
		<Box pt={{ base: "130px", md: "130px", xl: "120px" }}>
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
                    <GnbCard title={"대메뉴"} listData={list}/>
                </GridItem>
				<GridItem colSpan={2} rowSpan={5} >
                    <LnbGrid title={"메뉴목록"}/>
                </GridItem>
				<GridItem colSpan={4} rowSpan={5} >
                    <InfoBox title={"기본정보"}/>
                </GridItem>
			</Grid>
		</Box>
	);
};

export default Menu;