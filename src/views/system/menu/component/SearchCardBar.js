import React, { useEffect, useState } from 'react';
import { Box, Button, Select, Grid, Input, GridItem} from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { PORT } from 'set';

const SearchCardBar = ({menuList, searchGnbMenuCd, searchLnbMenuCd, searchMenuNm, setSearchGnbMenuCd,setSearchLnbMenuCd, setSearchMenuNm, onSearchClick, setOnSearchClick}) => {
	const [ categoryList, setCategoryList ] = useState([]);
	const getCategoryList = () => {
		fetch(`${PORT}/menu/category`, {method: 'GET'})
			.then((response) => response.json())
			.then((responseJson) => {
				setCategoryList(responseJson.data);
			});
	}

	const gnbList = () => {
		return (
			categoryList.map((menu) => {
				return (
					<option value={menu.menuCd}>{menu.menuNm}</option>
				)
			})
		)
	}

	useEffect(() => {
		getCategoryList();
	}, [menuList])

	return (
	<div>
		<Box borderRadius='lg' bg='white' p='6'>
			<Grid templateColumns='repeat(16, 1fr)' gap={2}>
				<GridItem colSpan={2}><div style={{textAlign: 'center'}}>대메뉴</div></GridItem>
				<GridItem colSpan={3}>
					<Select name='searchGnbMenuCd' defaultValue={searchGnbMenuCd} borderRadius="14px" onChange={(e) => {
						setSearchGnbMenuCd(e.target.value);
					}} >
						<option  value=''>전체</option>
						{gnbList()}
					</Select>
				</GridItem>

				<GridItem colSpan={2}><div style={{textAlign: 'center'}}>하위메뉴</div></GridItem>
				<GridItem colSpan={3}>
					<Select name='searchLnbMenuCd' defaultValue={searchLnbMenuCd} borderRadius="14px" onChange={(e) => {
						setSearchLnbMenuCd(e.target.value);
					}} >
						<option  value=''>전체</option>
					</Select>
				</GridItem>

				<GridItem colSpan={2}><div style={{textAlign: 'center'}}>메뉴명</div></GridItem>
				<GridItem colSpan={3}>
					<Input placeholder="검색어를 입력하세요." name='keyword' defaultValue={searchMenuNm} size="md" borderRadius="14px"  onChange={(e) => {
						setSearchMenuNm(e.target.value);
					}}/>
				</GridItem>
				
				<GridItem colStart={16} colEnd={16}>
					<Button variant="brand" onClick={() => setOnSearchClick(!onSearchClick)}>검색</Button>
				</GridItem>
			</Grid>
		</Box>
	</div>)
};

export default SearchCardBar;



