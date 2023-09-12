import React from 'react';
import { Box, Button, Select, Grid, Input, GridItem } from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';

const SearchCardBar = () => {
	return (<div>
		<Box display='flex' borderRadius='lg' bg='white' p='6'>
			<Grid templateColumns='repeat(14, 1fr)' gap={2}>
				<GridItem colSpan={1}><div style={{ height: '40px', lineHeight: '40px', textAlign: 'center' }}>회사</div></GridItem>
				<GridItem colSpan={2}>
					<Select placeholder='전체'>

						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</Select>
				</GridItem>
				<GridItem colStart={5} colEnd={6}><div style={{ height: '40px', lineHeight: '40px', textAlign: 'center' }}>재직구분</div></GridItem>

				<GridItem colSpan={2}>
					<Select colSpan={3} placeholder='전체'>
						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</Select>
				</GridItem>
				<GridItem colStart={9} colEnd={9}><div style={{ height: '40px', lineHeight: '40px', textAlign: 'center' }}>이름/ID</div></GridItem>
				<GridItem colSpan={3}>
					<Input placeholder="검색어를 입력하세요." size="md" borderRadius="14px" />
				</GridItem>
				<GridItem colStart={14} colEnd={14}>
					<Button variant="brand">검색</Button>
				</GridItem>
			</Grid>
		</Box>
	</div>)
};

export default SearchCardBar;



