/* eslint-disable */
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

/**
 * sidebar/components/Links.js
 * - 왼쪽 고정 메뉴바 메뉴들 표시
 * @param {*} props 
 * @returns 
 */

export function SidebarLinks(props) {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;
  const { collapse } = props;
  const { LNBroute } = props;
  const [ routeStat, setRouteStat ] = useState(location.pathname);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return routeStat.indexOf(routeName) > -1;
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
        return (
          route.path || !route.items ? //path가 있을때(하위메뉴가 없는 대메뉴)
          (<NavLink key={index} to={route.layout + route.path}>
              <Box
                onClick={() => {
                  setRouteStat(route.layout.toLowerCase() + route.path.toLowerCase());
                  LNBroute(route);
                }}
              >
                <HStack
                  spacing={
                    activeRoute(route.layout.toLowerCase() + route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py='5px'
                  ps='10px'>
                  <Flex w='100%' alignItems='center' justifyContent='center'>
                    <Box
                      color={
                        activeRoute(route.layout.toLowerCase() + route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me='18px'>
                      {route.icon}
                    </Box>
                    {
                      collapse &&
                        <>
                          <Text
                            me='auto'
                            color={
                              activeRoute(route.layout.toLowerCase() + route.path.toLowerCase())
                                ? activeColor
                                : textColor
                            }
                            fontWeight={
                              activeRoute(route.layout.toLowerCase() + route.path.toLowerCase())
                                ? "bold"
                                : "normal"
                            }>
                            {route.name}
                          </Text>
                        </>
                    }
                    
                  </Flex>
                  <Box
                    h='36px'
                    w='4px'
                    bg={
                      activeRoute(route.layout.toLowerCase() + route.path.toLowerCase())
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius='5px'
                  />
                </HStack>
              </Box>
          </NavLink>)
          : //path 없을때(하위 메뉴 있는 대메뉴)
          (
            <Box
                onClick={() => {
                  setRouteStat(route.layout.toLowerCase())
                  LNBroute(route);
                }}
                cursor={'pointer'}
              >
                <HStack
                  spacing={
                    activeRoute(route.layout.toLowerCase()) ? "22px" : "26px"
                  }
                  py='5px'
                  ps='10px'>
                  <Flex w='100%' alignItems='center' justifyContent='center'>
                    <Box
                      color={
                        activeRoute(route.layout.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me='18px'>
                      {route.icon}
                    </Box>
                    {
                      collapse &&
                        <>
                          <Text
                            me='auto'
                            color={
                              activeRoute(route.layout.toLowerCase())
                                ? activeColor
                                : textColor
                            }
                            fontWeight={
                              activeRoute(route.layout.toLowerCase())
                                ? "bold"
                                : "normal"
                            }>
                            {route.name}
                          </Text>
                          {route.items && <ChevronRightIcon/>}
                        </>
                    }
                    
                  </Flex>
                  <Box
                    h='36px'
                    w='4px'
                    bg={
                      activeRoute(route.layout.toLowerCase())
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius='5px'
                  />
                </HStack>
              </Box>
          )
        );
    });
  };
  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
