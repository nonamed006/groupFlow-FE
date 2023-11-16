import { Box, Button, Flex } from '@chakra-ui/react';
import React from "react";
import SearchBar from "common/component/SearchBar";
const SearchBarOrga = ({ setKeyword, setSearch, handleSearchBtn }) => {
    const values = [
        {
            code: 'corp',
            name: '회사명',
        },
        {
            code: 'dep',
            name: '부서명',
        },
        {
            code: 'empNm',
            name: '사원명',
        },
        {
            code: 'empId',
            name: '메일ID',
        },
        {
            code: 'rank',
            name: '직급',
        }
    ];
    return (
        <Flex
            bg="white"
            justifyContent={"space-around"}
            w={'100%'}
            boxShadow={'md'}
            pl={5}
            borderRadius={'10px'}
        >
            <Box w={'40%'}>
                <SearchBar
                    setKeyword={setSearch}
                    textLabel={'검색기준'}
                    placeholder={'전체'}
                    isSelect={true}
                    values={values}
                    defaultValue={''}
                />
            </Box>
            <Box w={'40%'}>
                <SearchBar
                    setKeyword={setKeyword}
                    textLabel={'검색어'}
                    placeholder={'검색어를 입력하세요.'}
                    defaultValue={''}
                    name={'keyword'}
                />        
            </Box>
            <Box w={'10%'}>
                <Button 
                    variant="brand" 
              		borderRadius={"10px"}
              		fontWeight={"600"} 
                    onClick={() => handleSearchBtn()}>{'검색'}</Button>
            </Box>

        </Flex>


    );
};

export default SearchBarOrga;
