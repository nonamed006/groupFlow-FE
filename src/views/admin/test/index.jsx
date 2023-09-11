import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import SearchCardBar from './component/SearchCardBar';
import EmpCard from './component/EmpCard';
import EmpInfo from './component/EmpInfo';

const test = () => {
	return (
		//헤더 공간 제외한 div 공간 지정
		/**
		 * h: 그리드 총 높이
		 * templateRows 세로 칸 수
		 * templateColumns 세로 칸 수
		 * gap 마진 비슷 값 클수록 그리드 안의 요소 서로 멀어짐
		 */
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<Grid
				h='1000px'
				templateRows='repeat(11, 1fr)'
				templateColumns='repeat(6, 1fr)'
				gap={5}
			>
				<GridItem colSpan={6} rowSpan={1} ><SearchCardBar/></GridItem>
				<GridItem colSpan={2} rowSpan={5} ><EmpCard/></GridItem>
				<GridItem colSpan={4} rowSpan={5} ><EmpInfo/></GridItem>
			</Grid>
		</Box>
	);
};

export default test;