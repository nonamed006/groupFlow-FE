import { VStack, StackDivider, Box, Heading, Text, Icon, Image, Flex, createIcon  } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { UseMouseOver } from 'hook/UseMouseOver';
import { React, useEffect, useState } from 'react';
import { MdHome } from 'react-icons/md';
import { PORT } from 'set';

const GnbCardList = ({list, setGnbMenuDetail, selectGnbMenuCd}) => {
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

  return (
    list.length > 0 && (
      list.map((gnb) => {
        return (
          <Card
            key={gnb.menuCd}
            onClick={() => setGnbMenuDetail(gnb.menuCd)}
            backgroundColor={mouseOverIndex === gnb.menuCd || selectGnbMenuCd === gnb.menuCd ? 'navy.50' : gnb.useYn !== 1 ? 'gray.200' : 'white'}
            onMouseOut={onMouseOut}
            onMouseOver={() => {
                onMouseOver(gnb.menuCd)
            }}
            boxShadow='lg'
            rounded='md'
            bg='white'
            my='2'
            display={'inline-block'}
            px='10px'
            py='25px'
            cursor={'pointer'}
            borderColor={(selectGnbMenuCd === gnb.menuCd) && 'brand.500'}
            shadow={(selectGnbMenuCd === gnb.menuCd) ? 'outline' : 'md'}
          >
            <Flex>
              {/* <Icon as={MdHome} width='20px' height='20px' color='inherit' mr={3}/> */}
              {
                gnb.fileType === 'FIA0003' ? 
                  <Image src={`${PORT}/menu/icon-${gnb.fileCd}`} alt={gnb.menuNm} w='20px' h='20px' mr={3}/>
                :
                  <Image src={gnb.filePath} alt={gnb.menuNm} w='20px' h='20px' mr={3}/>
              }
              <Heading flex={1} fontSize='xl'>{gnb.menuNm}</Heading>
              <Text textAlign={'right'} color={'gray.400'} w={'45px'}>{gnb.useYn === 1 ? '사용' : '미사용'}</Text>
            </Flex>
          </Card>
        )
      })
    )

  );
};
  
export default GnbCardList;
  