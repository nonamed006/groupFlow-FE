import { Box, Text, Select, Flex } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { PORT } from "set";
import SearchBar from "common/component/SearchBar";

const SearchBarMenu = ({ typeCd, rgCd, handelSearchBtn, setKeyword, setSelectedMenu, coCd }) => {
	const [menuList, setMenuList] = useState();// 대메뉴 목록 (셀렉트박스에서 사용됨)
	const formInputRef = useRef(null);

	useEffect(() => {
		if (rgCd !== undefined && rgCd !== 'undefined') {
			fetchMenuList();
			onClearSelect();
			setSelectedMenu();
		}
	}, [rgCd, typeCd]);

	useEffect(()=>{
		setMenuList();
	},[coCd]);

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
				setMenuList(res.data);
			});
	}

	return (

		<Box bg='white'
			align={{ sm: "flex-start", lg: "center" }}
			w="100%"
		>
			<form ref={formInputRef}>
				<Flex>
					<Text
						mr={2}
						style={{
							height: "40px",
							lineHeight: "40px",
							textAlign: "left",
						}}>대메뉴</Text>
					<Select
						w={'30%'}
						mr={4}
						name='gnbMenu'
						borderRadius="14px"
						onChange={(e) => setSelectedMenu(e.target.value)}
						fontSize="0.95em">
						<option value={'undefined'} >전체</option>
						{menuList &&
							menuList.map((menu, index) => {
								return (<option key={menu.menuCd} value={menu.menuCd}>{menu.menuNm}</option>);
							})}
					</Select>

					<SearchBar
						init={rgCd}
						textLabel={'메뉴명'}
						setKeyword={setKeyword}
						handleSearchBtn={handelSearchBtn}
						placeholder={'검색어를 입력하세요'}
						btnText={'검색'}
					/>
				</Flex>
			</form>
		</Box>
	);
};

export default SearchBarMenu;
