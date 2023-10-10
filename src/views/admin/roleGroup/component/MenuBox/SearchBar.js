import { Box, Grid, Button, Text, GridItem, Select, Input } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { PORT } from "set";

const SearchBar = ({ typeCd, rgCd, handelSearchBtn, setKeyword, setSelectedMenu, selectedMenu, changeEdit }) => {
	const [menuList, setMenuList] = useState();// 대메뉴 목록 (셀렉트박스에서 사용됨)
	const formInputRef = useRef(null);

	useEffect(() => {
		if (rgCd !== undefined && rgCd !== 'undefined'){
			fetchMenuList();
			onClearSelect();
		}
	}, [rgCd, typeCd]);

	const onClearSelect = () => {
		if (formInputRef.current) 
			formInputRef.current.reset();
	}

	// 대메뉴 이름/코드 목록 조회
	const fetchMenuList = () => {
		let url = `${PORT}/roleMenu/gnbList/${rgCd}`;
		if (typeCd !== undefined && typeCd !== 'undefined')
			url += `?typeCd=${typeCd}`
		fetch(url, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.result === 'success')
					setMenuList(res.data);
			});
	}

	return (

		<Box bg='white'
			align={{ sm: "flex-start", lg: "center" }}
			w="100%"
			pb="13px"
		>
			<form ref={formInputRef}>
				<Grid templateColumns='repeat(14, 1fr)' gap={1}>

					<GridItem colSpan={2}><Text style={{ textAlign: 'center' }}>대메뉴</Text></GridItem>
					<GridItem colSpan={4}>
						<Select name='gnbMenu' borderRadius="14px" onChange={(e) => setSelectedMenu(e.target.value)} fontSize="0.95em">
							<option value={'undefined'} >전체</option>
							{menuList &&
								menuList.map((menu, index) => {
									return (<option key={menu.menuCd} value={menu.menuCd}>{menu.menuNm}</option>);
								})}
						</Select>
					</GridItem>

					<GridItem colStart={7} colEnd={9}><Text style={{ textAlign: 'center' }}>메뉴명</Text></GridItem>
					<GridItem colSpan={5}>
						<Input placeholder="검색어를 입력하세요." name='keyword' size="md" borderRadius="14px" onChange={(e) => setKeyword(e.target.value)} />
					</GridItem>

					<GridItem colStart={14} colEnd={14}>
						<Button variant="brand" onClick={() => handelSearchBtn()}>검색</Button>
					</GridItem>
				</Grid>
			</form>
		</Box>
	);
};

export default SearchBar;
