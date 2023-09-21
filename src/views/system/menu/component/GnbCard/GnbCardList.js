import { VStack, StackDivider, Box, Heading, Text, Icon, Image, Flex  } from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
import { MdHome } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from 'redux/menu';
import { PORT } from 'set';

const GnbCardList = ({list}) => {
  const dispatch = useDispatch();                   //리덕스
  const { menu } = useSelector(state => state.menu);//선택한 메뉴 상세 정보

  const onClickGnb = async (gnb) => {
    //const [ menuInfo, setMenuInfo ] = useState([]); //api로 조회한 메뉴 상세 정보

    await fetch(`${PORT}/menu/find-${gnb.menuCd}`, {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.result === 'SUCCESS') {
            dispatch(setMenu(responseJson.voData));
          } else {
            alert(responseJson.resultMsg);
          }
        }
      );
  }

  return (
    <VStack
      spacing={4}
      align='stretch'
    >
      {
        list ? (
          list.map((gnb) => {
            return (
              <Box
                key={gnb.menuCd}
                py={7}
                px={5}
                borderWidth='1px'
                borderRadius={'xl'}
                onClick={() => onClickGnb(gnb)}
                borderColor={menu.menuCd === gnb.menuCd && 'brand.500'}
                shadow={menu.menuCd === gnb.menuCd ? 'outline' : 'md'}
                backgroundColor={gnb.useYn === 1 ? 'white' : 'gray.200'}>
                <Flex>
                  <Icon as={MdHome} width='20px' height='20px' color='inherit' mr={3}/>
                  <Heading fontSize='xl'>{gnb.menuNm}</Heading>
                  <Text flex={1} textAlign={'right'} color={'gray.400'}>{gnb.useYn === 1 ? '사용' : '미사용'}</Text>
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
  
export default GnbCardList;
  