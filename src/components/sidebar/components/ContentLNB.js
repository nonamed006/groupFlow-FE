// chakra imports
import { Box, Center, Flex, Stack, Text, Link } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import LinksLNB from "components/sidebar/components/LinksLNB";
//import SidebarCard from "components/sidebar/components/SidebarCard"; 혜윤 - 수정
import React from "react";
import { HamburgerIcon, ChevronLeftIcon } from "@chakra-ui/icons";

/*
sidebar/components/ContentGNB.js
 - 왼쪽 고정 메뉴바 내용
 - 대메뉴 담당
*/

// FUNCTIONS
function SidebarContentGNB(props) {
  const { routes } = props;
  const { route } = props;
  const { LNBroute } = props;

  const setLnbBack = (items) => {
    items.map((routeMap) => {
      if(routeMap.code === route.upper) { // when 현재 라우터의 상위코드랑 맞으면
        LNBroute(routeMap);               // then 상위 라우터로 변경
      } else if(Object.keys(routeMap).includes('items')) {  // when 하위 메뉴 있으면
        setLnbBack(routeMap.items);                         // then 재귀호출
      }
    })
  }
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' px="16px">
      <Flex h={20}>
        <Center>
            <HamburgerIcon w={10}/>
        </Center>
        <Center flex={1}>
          <Brand/>
        </Center>
      </Flex>
      {
          route &&
            <Box
              w={'full'}
              textAlign={'center'}
            >
              {
                route.upper ? 
                (//상위메뉴 코드 있으면 이동할 수 있도록
                  <>
                    <Link
                      ml={'5px'}
                      color={'black'}
                      fontWeight={'bold'}
                      fontSize={'17px'}
                      onClick={() => setLnbBack(routes)}
                    >
                    <ChevronLeftIcon mr={'10px'}/>
                    {route.name}
                    </Link>
                  </>
                ) : (
                  //GNB일때 텍스트만 보이게
                  <Text
                    me='auto'
                    color={'black'}
                    fontSize={'17px'}
                    fontWeight={'bold'}>
                    {route.name}
                  </Text>
                )
              }
            </Box>
        }
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
            <LinksLNB routes={routes} route={route} LNBroute={LNBroute}/>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContentGNB;
