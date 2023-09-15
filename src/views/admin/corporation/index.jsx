import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from "react";
import { useEffect } from "react";
import SearchCardBar from './component/SearchCardBar';
import ListCard from './component/ListCard/ListCard';
import InfoBox from './component/InfoBox/InfoBox';
import { PORT } from "set";
import { useDispatch, useSelector } from "react-redux";
import { setChangeYn } from "redux/corporation";

const Corporation = () => {
	const dispatch = useDispatch();
	const changeYn = useSelector((state) => state.corporation.changeYn);	// 삭제 변경 여부
	const [corpList, setCorpList] = useState([]);	// 회사 데이터 목록
	const [keyword, setKeyword] = useState('');	// 검색어
	const [useYn, setUseYn] = useState('');	// 사용여부

	useEffect(() => {
		changeYn?dispatch(setChangeYn(false)):fetchCorpList();
	}, [changeYn]);

	// 회사 목록 조회 및 검색
	const fetchCorpList = () => {
		let url = `${PORT}/corp`;

		// URL 파라미터 생성
		const params = new URLSearchParams();
		if (keyword !== '')
			params.append('keyword', keyword);
		if (useYn !== '')
			params.append('useYn', useYn);
			
		// URL에 파라미터 추가
		const paramString = params.toString();
		if (paramString) {
			url += '?' + paramString;
		}
		fetch(url, {
			method: "GET"
		}).then(res => res.json()).then(res => {
			setCorpList(res.data);
		});
	};

	// 검색 버튼 클릭 시
	const handleSearchBtn = () => {
		fetchCorpList();
	}

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
				h='auto'
				templateRows='repeat(11, 1fr)'
				templateColumns='repeat(6, 1fr)'
				gap={5}
			>
				<GridItem colSpan={6} rowSpan={1} >
					<SearchCardBar setKeyword={setKeyword} setUseYn={setUseYn} handleSearchBtn={handleSearchBtn} />
				</GridItem>
				<GridItem colSpan={2} rowSpan={5} >
					<ListCard title={"회사"} listData={corpList} />
				</GridItem>
				<GridItem colSpan={4} rowSpan={5} >
					<InfoBox />
				</GridItem>
			</Grid>
		</Box>
	);
};

export default Corporation;