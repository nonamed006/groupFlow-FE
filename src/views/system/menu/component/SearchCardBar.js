import React, { useEffect, useState } from 'react';
import { Box, Button, Select, Grid, Input, GridItem} from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { PORT } from 'set';

const SearchCardBar = ({search, setSearch, gnbMenuList, searchGnbMenuCd, searchLnbMenuCd, searchMenuNm, setSearchGnbMenuCd,setSearchLnbMenuCd, setSearchMenuNm, onSearchClick, setOnSearchClick}) => {
	const [ gnbCategoryList, setGnbCategoryList ] = useState([]);
	const [ lnbCategoryList, setLnbCategoryList ] = useState([]);

	// 대메뉴 카테고리 목록 조회
	const getGnbCategoryList = () => {
		fetch(`${PORT}/menu/category`, {method: 'GET'})
			.then((response) => response.json())
			.then((responseJson) => {
				setGnbCategoryList(responseJson.data);
			});
	}

	// 하위메뉴 카테고리 목록 조회
	const getLnbCategoryList = () => {
		fetch(`${PORT}/menu/category-${search.searchGnbMenuCd}`, {method: 'GET'})//searchGnbMenuCd
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				setLnbCategoryList(responseJson.data);
			});
	}

	// 대메뉴 카테고리 option 태그 생성
	const gnbList = () => {
		return (
			gnbCategoryList.map((menu) => {
				return (
					<option value={menu.menuCd}>{menu.menuNm}</option>
				)
			})
		)
	}

	// 하위메뉴 카테고리 option 태그 생성
	const lnbList = () => {
		if(!lnbCategoryList) {
			return false;
		}
		
		return (
			lnbCategoryList.map((menu) => {
				return (
					<option value={menu.menuCd}>{menu.menuNm}</option>
				)
			})
		)
	}

	useEffect(() => {
		getGnbCategoryList();
		getLnbCategoryList();
	}, [search.searchGnbMenuCd])//searchGnbMenuCd

	return (
	<div>
		<Box borderRadius='lg' bg='white' p='6'>
			<Grid templateColumns='repeat(16, 1fr)' gap={2}>
				<GridItem colSpan={2}><div style={{textAlign: 'center'}}>대메뉴</div></GridItem>
				<GridItem colSpan={3}>
					<Select name='searchGnbMenuCd' defaultValue={searchGnbMenuCd} borderRadius="14px" onChange={(e) => {
						//setSearchGnbMenuCd(e.target.value);
						setSearch({
							...search,
							searchGnbMenuCd: e.target.value
						})
						console.log(search);
					}} >
						<option  value=''>전체</option>
						{gnbList()}
					</Select>
				</GridItem>

				<GridItem colSpan={2}><div style={{textAlign: 'center'}}>하위메뉴</div></GridItem>
				<GridItem colSpan={3}>
					<Select name='searchLnbMenuCd' defaultValue={searchLnbMenuCd} borderRadius="14px" onChange={(e) => {
						//setSearchLnbMenuCd(e.target.value);
						setSearch({
							...search,
							searchLnbMenuCd: e.target.value
						})
					}} >
						<option  value=''>전체</option>
						{lnbList()}
					</Select>
				</GridItem>

				<GridItem colSpan={2}><div style={{textAlign: 'center'}}>메뉴명</div></GridItem>
				<GridItem colSpan={3}>
					<Input placeholder="검색어를 입력하세요." name='keyword' defaultValue={searchMenuNm} size="md" borderRadius="14px"  onChange={(e) => {
						//setSearchMenuNm(e.target.value);
						setSearch({
							...search,
							searchMenuNm: e.target.value
						})
					}}/>
				</GridItem>
				
				<GridItem colStart={16} colEnd={16}>
					<Button variant="brand" onClick={() => {
						//setOnSearchClick(!onSearchClick)
						setSearch({
							...search,
							onSearchClick: !search.onSearchClick
						})
					}}>검색</Button>
				</GridItem>
			</Grid>
		</Box>
	</div>)
};

export default SearchCardBar;



