import React from 'react';
import { Box, Button, Select, Grid, Input, GridItem} from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';

const SearchCardBar = ({onChangeSearchKeyword,onChangeSearchGnbMenuCd, onChangeSearchLnbMenuCd, onClick}) => {

	return (
	<div>
		<Box borderRadius='lg' bg='white' p='6'>
			<Grid templateColumns='repeat(16, 1fr)' gap={2}>
				<GridItem colSpan={2}><div style={{textAlign: 'center'}}>대메뉴</div></GridItem>
				<GridItem colSpan={3}>
					<Select name='searchGnbMenuCd' defaultValue='' borderRadius="14px" onChange={onChangeSearchGnbMenuCd} >
						<option  value=''>전체</option>
					</Select>
				</GridItem>

				<GridItem colSpan={2}><div style={{textAlign: 'center'}}>하위메뉴</div></GridItem>
				<GridItem colSpan={3}>
					<Select name='searchLnbMenuCd' defaultValue='' borderRadius="14px" onChange={onChangeSearchLnbMenuCd} >
						<option  value=''>전체</option>
					</Select>
				</GridItem>

				<GridItem colSpan={2}><div style={{textAlign: 'center'}}>메뉴명</div></GridItem>
				<GridItem colSpan={3}>
					<Input placeholder="검색어를 입력하세요." name='keyword' size="md" borderRadius="14px"  onChange={onChangeSearchKeyword}/>
				</GridItem>
				
				<GridItem colStart={16} colEnd={16}>
					<Button variant="brand" onClick={onClick}>검색</Button>
				</GridItem>
			</Grid>
		</Box>
	</div>)
};

export default SearchCardBar;



