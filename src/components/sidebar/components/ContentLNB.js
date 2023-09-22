// chakra imports
import { Box, Center, Flex, Stack, IconButton, Icon, Text, Link } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import LinksLNB from "components/sidebar/components/LinksLNB";
//import SidebarCard from "components/sidebar/components/SidebarCard"; 혜윤 - 수정
import React from "react";
import { HamburgerIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { HSeparator } from "components/separator/Separator";

/*
sidebar/components/ContentGNB.js
 - 왼쪽 고정 메뉴바 내용
 - 대메뉴 담당
*/

// FUNCTIONS
function SidebarContentGNB(props) {
  const { routes } = props;
  const { route } = props;
  const { setCollapse } = props;
  const { LNBroute } = props;

  const setLnbBack = (items) => {
    items.map((routeMap) => {
      if(routeMap.code === route.upper) {
        LNBroute(routeMap);
      } else if(Object.keys(routeMap).includes('items')) {
        setLnbBack(routeMap.items);
      }
    })
  }
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' px="16px">
      <Flex h={20}>
        <Center>
          {/* <IconButton 
            colorScheme="brand"
            aria-label='menu button'
            borderRadius='10px'
            icon={<HamburgerIcon w={10}/>}/> */}
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
                    <ChevronLeftIcon/>
                    <Link
                      me='auto'
                      color={'black'}
                      fontWeight={'bold'}
                      onClick={() => setLnbBack(routes)}
                    >
                    {route.name}
                    </Link>
                  </>
                ) : (
                  //GNB일때 텍스트만 보이게
                  <Text
                    me='auto'
                    color={'black'}
                    fontWeight={'bold'}>
                    {route.name}
                  </Text>
                )
              }
            </Box>
        }
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
            <LinksLNB routes={routes} route={route} LNBroute={LNBroute} setCollapse={setCollapse}/>
        </Box>
      </Stack>

      {/* <Box
        mt='60px'
        mb='40px'
        borderRadius='30px'>
        <SidebarCard />
      </Box> */}
    </Flex>
  );
}

export default SidebarContentGNB;
