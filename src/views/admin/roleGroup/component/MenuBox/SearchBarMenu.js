import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import SearchBar from "common/component/SearchBar";

const SearchBarMenu = ({ menuList, fetchMenuList, typeCd, rgCd, handleSearchBtn, setKeyword, setSelectedMenu }) => {
	let [values, setValues] = useState();
	const formInputRef = useRef(null);

	useEffect(() => {
		if (menuList) {
			const updatedValues = menuList.map(menu => ({
				code: menu.menuCd,
				name: menu.menuNm
			}));
			setValues(updatedValues);
		}
	}, [menuList]);

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
					<Box w={'50%'}>
						<SearchBar
							textLabel={'대메뉴'}
							setKeyword={setSelectedMenu}
							placeholder={'전체'}
							isSelect={true}
							values={values}
							name={'gnbMenu'}
							defaultValue={'undefined'}
						/>
					</Box>
					<Box w={'50%'}>
						<SearchBar
							textLabel={'메뉴명'}
							setKeyword={setKeyword}
							handleSearchBtn={handleSearchBtn}
							placeholder={'검색어를 입력하세요'}
							btnText={'검색'}
							name={'keyword'}
							defaultValue={''}
						/>
					</Box>
				</Flex>
			</form>
		</Box>
	);
};

export default SearchBarMenu;
