import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import SearchCardBar from './component/SearchCardBar';
import EmpInfo from './component/InfoBox/InfoBox';
import ListCard from './component/ListCard/ListCard';
import InfoBox from './component/InfoBox/InfoBox';

const corporation = () => {
        //테이블 헤더
        const headerGroups = ["회사명", "회사코드", "대표자", "구분"];
        const listData =[
            {'coCd' : 'coCd', 'coNm' : 'coNm', 'ceoNm': 'ceoNm', 'ccNm' : 'ccNm'},
            {'coCd' : 'coCd', 'coNm' : 'coNm', 'ceoNm': 'ceoNm', 'ccNm' : 'ccNm'},
            {'coCd' : 'coCd', 'coNm' : 'coNm', 'ceoNm': 'ceoNm', 'ccNm' : 'ccNm'}
        ];
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
				<GridItem colSpan={2} rowSpan={5} ><ListCard title={"회사"} headerGroups={headerGroups} listData={listData}/></GridItem>
				<GridItem colSpan={4} rowSpan={5} ><InfoBox title={"기본정보"} /></GridItem>
			</Grid>
		</Box>
	);
};

export default corporation;