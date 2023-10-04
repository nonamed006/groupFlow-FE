import { VStack, StackDivider, Box, Heading, Text, Icon, Image, Flex  } from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
import { MdHome } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from 'redux/menu';
import { PORT } from 'set';

const GnbCardList = ({list, menuInfo, setGnbMenuDetail, selectGnbMenuCd}) => {

  return (
    <VStack
      spacing={4}
      align='stretch'
    >
      {
        list.length > 0 && (
          list.map((gnb) => {
            return (
              <Box
                key={gnb.menuCd}
                py={7}
                px={5}
                borderWidth='1px'
                borderRadius={'xl'}
                onClick={() => setGnbMenuDetail(gnb.menuCd)}
                borderColor={selectGnbMenuCd === gnb.menuCd && 'brand.500'}
                shadow={selectGnbMenuCd === gnb.menuCd ? 'outline' : 'md'}
                backgroundColor={gnb.useYn === 1 ? 'white' : 'gray.200'}
                cursor={'pointer'}>
                <Flex>
                  <Icon as={MdHome} width='20px' height='20px' color='inherit' mr={3}/>
                  <Heading flex={1} fontSize='xl'>{gnb.menuNm}</Heading>
                  <Text textAlign={'right'} color={'gray.400'} w={'45px'}>{gnb.useYn === 1 ? '사용' : '미사용'}</Text>
                </Flex>
              </Box>
            )
          })
        )
      }
    </VStack>

  );
};
  
export default GnbCardList;
  