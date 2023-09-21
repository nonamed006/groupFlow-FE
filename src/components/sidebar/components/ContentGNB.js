// chakra imports
import { Box, Center, Flex, Stack, IconButton, Icon } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import LinksGNB from "components/sidebar/components/LinksGNB";
import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

/*
sidebar/components/ContentGNB.js
 - 왼쪽 고정 메뉴바 내용
 - 대메뉴 담당
*/

// FUNCTIONS
function SidebarContentGNB(props) {
  const { routes } = props;
  const { collapse } = props;
  const { LNBroute } = props;
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' px="16px">
      <Flex h={20}>
        <Center>
            <HamburgerIcon w={10}/>
        </Center>
        {
          collapse &&
            <Center flex={1}>
              <Brand/>
            </Center>
        }
      </Flex>
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
            <LinksGNB routes={routes} collapse={collapse} LNBroute={LNBroute}/>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContentGNB;