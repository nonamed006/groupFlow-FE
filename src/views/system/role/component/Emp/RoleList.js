import { Box, Grid, GridItem, Select, Button, Input, VStack, Flex, Heading, Text } from "@chakra-ui/react";
import { React, useState, useEffect } from "react";

const RoleList = ({}) => {
  
  return (
      <Box borderRadius="lg" bg="white" h={'full'} p="6" overflowY={'scroll'}>
        <Grid templateColumns='repeat(4, 1fr)' gap={2}>
            <GridItem colSpan={3}>
                <Input placeholder="부서명/사원명을 입력하세요." name='keyword' defaultValue={''} size="md" borderRadius="14px"  onChange={(e) => {
                    // setSearch({
                    // 	...search,
                    // 	searchMenuNm: e.target.value
                    // })
                }}/>
            </GridItem>
            <GridItem colStart={4} colEnd={4}>
                <Button variant="brand" onClick={() => {
                    // setSearch({
                    // 	...search,
                    // 	onSearchClick: !search.onSearchClick
                    // })
                }}>검색</Button>
            </GridItem>
        </Grid>
        <VStack spacing={4} align='stretch'>
            <Box
                py={7}
                px={5}
                borderWidth='1px'
                borderRadius={'xl'}
                borderColor={'brand.500'}
                shadow={'md'}
                backgroundColor={'white'}
                cursor={'pointer'}>
                <Flex>
                <Heading flex={1} fontSize='xl'>Test</Heading>
                <Text textAlign={'right'} color={'gray.400'} w={'45px'}>{true ? '사용' : '미사용'}</Text>
                </Flex>
            </Box>
        </VStack>
      </Box>
  );
};
  
  export default RoleList;
  