import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import FormInput from "common/component/FormInput";

const SearchBarMenu = ({ code, menuList, fetchMenuList, typeCd, rgCd, handleSearchBtn, selectedMenu, setKeyword, setSelectedMenu }) => {
	let [values, setValues] = useState();
	const formInputRef = useRef(null);

	useEffect(() => {
		if (menuList) {
			const updatedValues = menuList.map(menu => ({
				value: menu.menuCd,
				name: menu.menuNm
			}));
			setValues(updatedValues);
		}
	}, [menuList]);

	useEffect(() => {
		if (rgCd !== undefined && rgCd !== 'undefined') {
			fetchMenuList();
		} else {
			setValues([]);
		}
		onClearSelect();
	}, [code, rgCd, typeCd]);


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
					<Box w={'50%'} mr={10}>
						<FormInput
							type={'select'}
							searchBar={true}
							title={'대메뉴'}
							onChange={e => setSelectedMenu(e.target.value)}
							placeholder={'전체'}
							values={values&&values}
							name={'gnbMenu'}
							defaultValue={selectedMenu}
						/>
					</Box>
					<Box w={'50%'}>
						<FormInput
							searchBar={true}
							title={'메뉴명'}
							onChange={e => setKeyword(e.target.value)}
							handleSearchBtn={()=>handleSearchBtn()}
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
