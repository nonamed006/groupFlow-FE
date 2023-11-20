import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import SearchBar from 'common/component/SearchBar';

const SearchCardBar = ({ setUseYn, setKeyword, handleSearchBtn }) => {

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
					textLabel={'회사명'}
					placeholder="검색어를 입력하세요."
					name='keyword'
					setKeyword={setKeyword}
				/>
			</Box>
			<Box w={'30%'} >
				<SearchBar
					textLabel={'사용여부'}
					placeholder="전체"
					name='useYn'
					setKeyword={setUseYn}
					isSelect={true}
					defaultValue={''}
					values={[
						{ code: 1, name: '사용' },
						{ code: 0, name: '미사용' },
					]}
				/>
			</Box>
			<Box w={'30%'}>
				<Button 
					float={'right'} 
					variant="brand" 
              		borderRadius={"10px"}
              		fontWeight={"600"}
              		m={1}
					onClick={() => { handleSearchBtn() }}>검색</Button>
			</Box>
		</Flex>
	)
};

export default SearchCardBar;



