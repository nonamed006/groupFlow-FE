import React from 'react';
import { Box, Button, Select, Grid, Input, GridItem} from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';

const SearchCardBar = () => {
	return (
	<div>
		<Box borderRadius='lg' bg='white' p='6'>
			<Grid templateColumns='repeat(14, 1fr)' gap={2}>
				<GridItem colSpan={2}><div style={{textAlign: 'center'}}>회사코드/회사명</div></GridItem>
				<GridItem colSpan={3}>
					<Input placeholder="검색어를 입력하세요." size="md" borderRadius="14px" />
				</GridItem>

				<GridItem colSpan={2}><div style={{textAlign: 'center'}}>사용여부</div></GridItem>
				<GridItem colSpan={3}>
					<Select colSpan={3} borderRadius="14px" >
						<option value='option1' selected>전체</option>
						<option value='option1'>사용</option>
						<option value='option2'>미사용</option>
					</Select>
				</GridItem>
				
				<GridItem colStart={14} colEnd={14}>
					<Button variant="brand">검색</Button>
				</GridItem>
			</Grid>
		</Box>
	</div>)
};

export default SearchCardBar;



