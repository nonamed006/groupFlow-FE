// chakra imports
import { Box, Center, Flex, Stack, IconButton, Icon } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import LinksGNB from "components/sidebar/components/LinksGNB";
import React, { useContext } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { SidebarContext } from "contexts/SidebarContext";

/*
sidebar/components/ContentGNB.js
 - 왼쪽 고정 메뉴바 내용
 - 대메뉴 담당
*/

// FUNCTIONS
function SidebarContentGNB(props) {
  const { routes } = props;
  const { LNBroute } = props;
  const {onClickHandler} = props;

  const context = useContext(SidebarContext);
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' px="16px">
      <Flex h={20}>
        <Center>
            <HamburgerIcon w={10}/>
        </Center>
        {
          context.collapse &&
            <Center flex={1} onClick={() => {
              document.querySelector(".box_GNB").classList.remove("active");
              document.querySelector(".box_GNB").classList.add("non_active");
            }}>
              <Brand/>
            </Center>
        }
      </Flex>
      <Stack direction='column' mb='auto' mt='8px' onClick={onClickHandler}>
        <Box pe={'5px'}>
            <LinksGNB routes={routes} LNBroute={LNBroute}/>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContentGNB;
