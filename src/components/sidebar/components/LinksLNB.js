/* eslint-disable */
import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { SidebarContext } from "contexts/SidebarContext";

/**
 * sidebar/components/Links.js
 * - 왼쪽 고정 메뉴바 메뉴들 표시
 * @param {*} props
 * @returns
 */

export function SidebarLinks(props) {
  //   Chakra color mode
  let location = useLocation();
  const { routes } = props; //전체 라우터
  const { route } = props; //선택한 하나의 라우터
  const { LNBroute } = props; //function setRoute 클릭 시 하나의 라우터 세팅
  const [routeStat, setRouteStat] = useState(location.pathname);

  const context = useContext(SidebarContext);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return routeStat === routeName;
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (prop) => {
    return prop.map((route, index) => {
      return route.path || !route.items ? ( //path가 있을때(하위메뉴가 없는 메뉴)
        <NavLink key={index} to={route.layout + route.path}>
          <Box
            onClick={() => {
              LNBroute(route);
            }}
          >
            <HStack spacing={"10"} py="5px" ps="10px">
              <Flex
                w="100%"
                alignItems="center"
                justifyContent="center"
                pl={"30"}
              >
                <Text me="auto" color="black" fontWeight="normal">
                  {route.name}
                </Text>
              </Flex>
            </HStack>
          </Box>
        </NavLink>
      ) : (
        //path 없을때(하위 메뉴 있는 메뉴)
        <Box
          onClick={() => {
            LNBroute(route); //LNB 정보 변경
          }}
          cursor={"pointer"}
          key={index}
        >
          <HStack
            spacing={activeRoute(route.layout.toLowerCase()) ? "22px" : "26px"}
            py="5px"
            ps="10px"
          >
            <Flex
              w="100%"
              alignItems="center"
              justifyContent="center"
              ml="40px"
            >
              <Text me="auto" color={"black"} fontWeight={"normal"}>
                {route.name}
              </Text>
              {route.items && <ChevronRightIcon />}
            </Flex>
          </HStack>
        </Box>
      );
    });
  };
  //  BRAND
  if (route) {
    if (Object.keys(route).includes("items")) {
      //하위메뉴 있는 메뉴
      return createLinks(route.items);
    } else {
      //하위메뉴 없는 메뉴
      LNBroute(null);
      context.setCollapse(false);
      return null;
    }
  } else {
    return createLinks(routes);
  }
}

export default SidebarLinks;
