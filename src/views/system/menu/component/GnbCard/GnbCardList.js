import { VStack, StackDivider, Box, Heading, Text, Icon, Image, Flex  } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdHome } from 'react-icons/md';

  const ListCardList = ({headerGroups, listData, onClickCorp }) => {
    return (
      <VStack
        // divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
      >
        {
          listData ? (
            listData.map((data) => {
              return (
                <Box py={7} px={5} shadow='md' borderWidth='1px' borderRadius={'xl'}>
                  <Flex>
                  <Icon as={MdHome} width='20px' height='20px' color='inherit' mr={3}/>
                  <Heading fontSize='xl'>{data.menuNm}</Heading>
                  </Flex>
                </Box>
              )
            })
          ) : (
            <Box h='40px' bg='white'>
              목록이 존재하지 않습니다.
            </Box>
          )
        }
      </VStack>

    );
  };
  
  export default ListCardList;
  