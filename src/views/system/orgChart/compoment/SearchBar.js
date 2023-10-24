import { Box, Button, Select, Input, Flex } from '@chakra-ui/react';
import React from "react";

const SearchBar = ({ setKeyword, setSearch, handleSearchBtn }) => {

    return (
        <Flex
            bg="white"
            justifyContent={"space-between"}
            w={'100%'}
            boxShadow={'md'}
            p={2}
            borderRadius={'10px'}
        >
            <Flex w={'30%'}>
                <Box style={{
                    width: "100px",
                    height: "40px",
                    lineHeight: "40px",
                    textAlign: "left",
                }}>검색기준</Box>

                <Select
                    onChange={(e) => { setSearch(e.target.value) }}
                    style={{ color: "gray" }}
                    defaultValue={''}
                    placeholder='전체'
                    borderRadius="14px"
                >
                    <option value='corp'>회사명</option>
                    <option value='dep'>부서명</option>
                    <option value='empNm'>사원명</option>
                    <option value='empId'>메일ID</option>
                    <option value='rank'>직급</option>
                </Select>
            </Flex>
            <Flex w={'40%'}>
                <Box style={{
                    width: "100px",
                    height: "40px",
                    lineHeight: "40px",
                    textAlign: "left",
                }}>검색어
                </Box>
                <Box w={'100%'} marginRight={'2'}>
                    <Input
                        placeholder={'검색어를 입력하세요.'}
                        name='keyword'
                        onChange={(e) => { setKeyword(e.target.value) }}
                        size="md"
                        borderRadius="14px"
                        defaultValue={''}
                    />
                </Box>
            </Flex>

            <Box w={'10%'}>
                <Button variant="brand" onClick={() => handleSearchBtn()}>{'검색'}</Button>
            </Box>

        </Flex>


    );
};

export default SearchBar;
