import React, { useEffect, useState } from 'react';
import { Box, Button, Select, Grid, Input, GridItem, Flex} from '@chakra-ui/react';
import SearchBar from 'common/component/SearchBar';
import api from 'api/Fetch';

const SearchCardBar = ({search, setSearch}) => {
	const [ gnbCategoryList, setGnbCategoryList ] = useState([]);
	const [ lnbCategoryList, setLnbCategoryList ] = useState([]);

	// 대메뉴 카테고리 목록 조회
	const getGnbCategoryList = async () => {
		const responseJson = await api.menu.getGnbCategoryList();

		const data = responseJson.data.map(value => {
			value.code = value.menuCd;
			value.name = value.menuNm;
			return value;
		});

		setGnbCategoryList(data);
	}

	// 하위메뉴 카테고리 목록 조회
	const getLnbCategoryList = async () => {
		const responseJson = await api.menu.getLnbCategoryList(search.searchGnbMenuCd);
		
		if(!responseJson.data) {
			setLnbCategoryList([]);
			return false;
		}
		const data = responseJson.data.map(value => {
			value.code = value.menuCd;
			value.name = (value.depth > 2 ? '　'.repeat(value.depth-2) : '') + '-' + value.menuNm;
			return value;
		});

		setLnbCategoryList(data);
	}

	useEffect(() => {
		getGnbCategoryList();
		getLnbCategoryList();
	}, [search.searchGnbMenuCd])//searchGnbMenuCd

	return (
		<Flex
			bg="white"
			justifyContent={"space-around"}
			w={'100%'}
			pl={5}
			p={1}
			borderRadius={'5px'}
			pt={5}
		>
			<Box w={'30%'} >
				<SearchBar
					textLabel={'대메뉴'}
					placeholder="전체"
					name='searchGnbMenuCd'
					setKeyword={value => {
						setSearch({
							...search,
							searchGnbMenuCd: value
						})
					}}
					isSelect={true}
					defaultValue={''}
					values={gnbCategoryList}
				/>
			</Box>
			<Box w={'30%'} >
				<SearchBar
					textLabel={'하위메뉴'}
					placeholder="전체"
					name='searchLnbMenuCd'
					setKeyword={value => {
						setSearch({
							...search,
							searchLnbMenuCd: value
						})
					}}
					isSelect={true}
					defaultValue={''}
					values={lnbCategoryList}
				/>
			</Box>
			<Box w={'30%'} >
				<SearchBar
					textLabel={'메뉴명'}
					placeholder="검색어를 입력하세요."
					name='keyword'
					setKeyword={value => {
						setSearch({
							...search,
							searchMenuNm: value
						})
					}}
					defaultValue={search.searchMenuNm}
				/>
			</Box>
			<Box w={'5%'} >
				<Button
					float={'right'}
					variant="brand"
					onClick={() => {
						setSearch({
							...search,
							onSearchClick: !search.onSearchClick
						})
					}}
				>
					검색
				</Button>
			</Box>
		</Flex>
	)
};

export default SearchCardBar;


