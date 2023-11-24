/* eslint-disable */
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { SidebarContext } from "contexts/SidebarContext";
import { UseMouseOver } from "hook/UseMouseOver";

/**
 * sidebar/components/Links.js
 * - 왼쪽 고정 메뉴바 메뉴들 표시
 * @param {*} props
 * @returns
 */

export function SidebarLinks(props) {
  //   Chakra color mode
  let activeIcon = useColorModeValue("brand.500", "white");
  let activeColor = useColorModeValue("gray.700", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;
  const { LNBroute } = props;
  const [routeStat, setRouteStat] = useState(window.location.pathname);
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

  const context = useContext(SidebarContext);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    //return routeStat.indexOf(routeName) > -1;
    return window.location.pathname.indexOf(routeName) > -1;
  };

  const checkRouterDepth = (route) => {
    return route.path && route.items.length <= 0; // 하위메뉴가 없는 LNB
  };
  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      return (
        <NavLink
          key={index}
          to={checkRouterDepth(route) && route.layout + route.path}
        >
          <Box
            h={"60px"}
            onClick={() => {
              setRouteStat(
                checkRouterDepth(route)
                  ? route.layout.toLowerCase() + route.path.toLowerCase()
                  : route.layout.toLowerCase()
              );
              LNBroute(route);
            }}
            cursor={"pointer"}
            key={index}
            onMouseOut={onMouseOut}
            onMouseOver={() => {
              onMouseOver(index);
            }}
          >
            <HStack
              spacing={
                //activeRoute(route.layout.toLowerCase() + route.path.toLowerCase()) ? "22px" : "26px"
                activeRoute(route.path) ? "22px" : "26px"
              }
              // py='5px'
              ps="10px"
            >
              <Flex w="100%" alignItems="center" justifyContent="center">
                <Box
                  color={
                    //activeRoute(route.layout.toLowerCase() + route.path.toLowerCase())
                    activeRoute(route.path) ? activeColor : textColor
                  }
                  w={"20px"}
                  h={"20px"}
                  style={{ filter: !activeRoute(route.path) && "opacity(0.5)" }}
                >
                  {route.icon}
                </Box>
                {context.collapse && (
                  <>
                    <Text
                      me="auto"
                      color={
                        //activeRoute(route.layout.toLowerCase() + route.path.toLowerCase())
                        activeRoute(route.path) || mouseOverIndex === index
                          ? activeColor
                          : textColor
                      }
                      fontSize={"17px"}
                      fontWeight={
                        //activeRoute(route.layout.toLowerCase() + route.path.toLowerCase())
                        activeRoute(route.path) ? "bold" : "normal"
                      }
                      ml={"15px"}
                    >
                      {route.name}
                    </Text>
                    {route.items.length > 0 && <ChevronRightIcon />}
                  </>
                )}
              </Flex>
              <Box
                h="36px"
                w="4px"
                bg={
                  //activeRoute(route.layout.toLowerCase() + route.path.toLowerCase())
                  activeRoute(route.path) ? brandColor : "transparent"
                }
                borderRadius="5px"
              />
            </HStack>
          </Box>
        </NavLink>
      );
    });
  };
  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
