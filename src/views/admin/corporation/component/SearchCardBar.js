import React from 'react';
import { Box, Button, Select, Grid, Input, GridItem } from '@chakra-ui/react';

const SearchCardBar = ({ setUseYn, setKeyword, handleSearchBtn }) => {

	return (
		<div>
			<Box borderRadius='lg' bg='white' p='6'>
				<Grid templateColumns='repeat(14, 1fr)' gap={2}>
					<GridItem colSpan={1}>
						<div style={{
							width: "100px",
							height: "40px",
							lineHeight: "40px",
							textAlign: "center",
						}}>회사명</div>
					</GridItem>
					<GridItem colSpan={3}>
						<Input placeholder="검색어를 입력하세요." name='keyword' size="md" borderRadius="14px" onChange={(e) => { setKeyword(e.target.value) }} />
					</GridItem>

					<GridItem colStart={5} colEnd={5}>
						<div style={{
							width: "100px",
							height: "40px",
							lineHeight: "40px",
							textAlign: "center",
						}}>사용여부</div>
					</GridItem>
					<GridItem colSpan={3}>
						<Select colSpan={3} name='useYn' borderRadius="14px" onChange={(e) => { setUseYn(e.target.value) }} >
							<option value=''>전체</option>
							<option value={1}>사용</option>
							<option value={0}>미사용</option>
						</Select>
					</GridItem>

					<GridItem colStart={14} colEnd={14}>
						<Button variant="brand" onClick={() => { handleSearchBtn() }}>검색</Button>
					</GridItem>
				</Grid>
			</Box>
		</div>)
};

export default SearchCardBar;



