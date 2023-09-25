import { Box, Grid, GridItem, Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchCardBar from "./component/SearchCardBar";
import ListCard from "./component/ListCard/ListCard";
import InfoBox from "./component/InfoBox/InfoBox";
import { PORT } from "set";
import OrgChartModal from "common/orgChart/OrgChartModal";

const Corporation = () => {
	const [corpList, setCorpList] = useState([]); // 회사 데이터 목록
	const [keyword, setKeyword] = useState(''); // 검색어
	const [useYn, setUseYn] = useState(''); // 사용여부
	const [coCd, setCoCd] = useState(); // 선택된 회사코드
	const [changeYn, setChangeYn] = useState(); // 변경 여부(회사목록 리렌더링 조건)
	const [sortValue, setSortValue] = useState();   // 초기 정렬 기본값
	const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 관련

	// 회사 목록 조회 및 검색
	const fetchCorpList = () => {
		let url = `${PORT}/corp`;

		// URL 파라미터 생성
		const params = new URLSearchParams();
		if (keyword !== "") params.append("keyword", keyword);
		if (useYn !== "") params.append("useYn", useYn);
		// URL에 파라미터 추가
		const paramString = params.toString();
		if (paramString) {
			url += "?" + paramString;
		}

		fetch(url, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((res) => {
				setCorpList(res.data);
				setChangeYn(false);
			});
	};

	// 정렬 기본값 가져오기
	const fetchMaxSort = () => {
		let url = `${PORT}/corp/sort`;
		fetch(url, {
			method: "GET"
		}).then(res => res.json()).then(res => {
			setSortValue(res.strData);
		});
	};


	// 검색 버튼 클릭 시
	const handleSearchBtn = () => {
		fetchCorpList();
		setCoCd();
	};

	// 초기 데이터 목록 및 정렬값 설정
	const initCorpList = () => {
		fetchCorpList();
		fetchMaxSort();
	}

	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<Grid
				h="1000px"
				templateRows="repeat(11, 1fr)"
				templateColumns="repeat(6, 1fr)"
				gap={5}
			>
				<GridItem colSpan={6} rowSpan={1}>
					{/* 검색창 */}
					<SearchCardBar
						setKeyword={setKeyword}
						setUseYn={setUseYn}
						handleSearchBtn={handleSearchBtn}
					/>
				</GridItem>
				<GridItem colSpan={2} rowSpan={5}>
					{/* 회사목록 */}
					<ListCard
						title={"회사"}
						listData={corpList}
						setCoCd={setCoCd}
						changeYn={changeYn}
						initCorpList={initCorpList}
					/>
				</GridItem>
				<GridItem colSpan={4} rowSpan={5}>
					{/* 회사정보 */}
					<InfoBox sortValue={sortValue} coCd={coCd} setCoCd={setCoCd} setChangeYn={setChangeYn} />
				</GridItem>
			</Grid>

			<Button onClick={onOpen}>조직도</Button>
			{isOpen ? <OrgChartModal isOpen={isOpen} onClose={onClose} /> : null}
		</Box>
	);
};

export default Corporation;
