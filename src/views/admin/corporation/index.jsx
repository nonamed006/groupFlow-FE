import { Box, Grid, GridItem, Button, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchCardBar from "./component/SearchCardBar";
import ListCard from "./component/ListCard/ListCard";
import InfoBox from "./component/InfoBox/InfoBox";
import OrgChartModal from "common/orgChart/OrgChartModal";
import CommonAlert from "common/component/CommonAlert";
import api from "api/Fetch";


const Corporation = () => {
	const [keyword, setKeyword] = useState(""); // 검색어
	const [useYn, setUseYn] = useState(""); // 사용여부
	const [coCd, setCoCd] = useState(); // 선택된 회사코드
	const [changeYn, setChangeYn] = useState(); // 변경 여부(회사목록 리렌더링 조건)
	const [sortValue, setSortValue] = useState(); // 초기 정렬 기본값

	const [alertInfo, setAlertInfo] = useState({
		isOpen: false
	});

	useEffect(() => {
		fetchMaxSort();
	}, []);

	useEffect(() => { // 저장, 삭제, 수정 등의 이벤트가 있을 때 다시 값 가져오기
		fetchMaxSort();
	}, [changeYn]);

	// 정렬 기본값 가져오기
	const fetchMaxSort = async () => {
		let res = await api.corp.getCorpSortApi();
		if (res.status === 200) {
		 		setSortValue(res.strData);
		} 
	};

	// 검색 버튼 클릭 시
	const handleSearchBtn = () => {
		setChangeYn(!changeYn);
		setCoCd();
	};

	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<Grid
				h="1000px"
				templateRows="repeat(11, 1fr)"
				templateColumns="repeat(6, 1fr)"
				gap={5}
			>
				{/* 검색창 */}
				<GridItem colSpan={6} rowSpan={1}>
					<SearchCardBar
						setKeyword={setKeyword}
						setUseYn={setUseYn}
						handleSearchBtn={handleSearchBtn}
					/>
				</GridItem>
				{/* 회사목록 */}
				<GridItem colSpan={2} rowSpan={5}>
					<ListCard
						title={"회사"}
						keyword={keyword}
						useYn={useYn}
						setCoCd={setCoCd}
						changeYn={changeYn}
						coCd={coCd}
					/>
				</GridItem>
				{/* 회사정보 */}
				<GridItem colSpan={4} rowSpan={5}>
					<InfoBox
						sortValue={sortValue}
						coCd={coCd}
						setCoCd={setCoCd}
						setChangeYn={setChangeYn}
						changeYn={changeYn}
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
			{/* <Button onClick={onOpen}>조직도</Button>
			{isOpen ? <OrgChartModal isOpen={isOpen} onClose={onClose} /> : null} */}
		</Box>
	);
};

export default Corporation;
