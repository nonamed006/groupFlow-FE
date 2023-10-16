import { Box, Text, Select, Flex } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";

import SearchBar from "common/component/SearchBar";

const SearchBarMenu = ({ menuList, fetchMenuList, typeCd, rgCd, handleSearchBtn, setKeyword, setSelectedMenu }) => {
	const formInputRef = useRef(null);

	useEffect(() => {
		if (rgCd !== undefined && rgCd !== 'undefined') {
			fetchMenuList();
			onClearSelect();
		}
	}, [rgCd, typeCd]);


	const onClearSelect = () => {
		if (formInputRef.current)
			formInputRef.current.reset();
	}
   

	return (

		<Box bg='white'
			align={{ sm: "flex-start", lg: "center" }}
			w="100%"
		>
			<form ref={formInputRef}>
				<Flex justifyContent={"space-around"}>
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
							menuList.map((menu) => {
								return (<option key={menu.menuCd} value={menu.menuCd}>{menu.menuNm}</option>);
							})}
					</Select>

					<Box w={'50%'}>
						<SearchBar
							textLabel={'메뉴명'}
							setKeyword={setKeyword}
							handleSearchBtn={handleSearchBtn}
							placeholder={'검색어를 입력하세요'}
							btnText={'검색'}
						/>
					</Box>
				</Flex>
			</form>
		</Box>
	);
};

export default SearchBarMenu;
