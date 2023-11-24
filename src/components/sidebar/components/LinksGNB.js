/* eslint-disable */
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
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
  let activeColor = useColorModeValue("gray.700", "white");
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;
  const { LNBroute } = props;
  const [routeStat, setRouteStat] = useState(window.location.pathname);

  const context = useContext(SidebarContext);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    //return routeStat.indexOf(routeName) > -1;
    return window.location.pathname.indexOf(routeName) > -1;
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      return route.path && route.items.length <= 0 ? ( //path가 있을때(하위메뉴가 없는 대메뉴)
        <NavLink key={index} to={route.layout + route.path}>
          <Box
            h={"50px"}
            onClick={() => {
              setRouteStat(
                route.layout.toLowerCase() + route.path.toLowerCase()
              );
              LNBroute(route);
            }}
          >
            <HStack
              spacing={
                //activeRoute(route.layout.toLowerCase() + route.path.toLowerCase()) ? "22px" : "26px"
                activeRoute(route.path) ? "22px" : "26px"
              }
              py="5px"
              ps="10px"
            >
              <Flex w="100%" alignItems="center" justifyContent="center">
                <Box
                  color={
                    //activeRoute(route.layout.toLowerCase() + route.path.toLowerCase())
                    activeRoute(route.path) ? activeIcon : textColor
                  }
                  w={"20px"}
                  h={"20px"}
                >
                  {route.icon}
                </Box>
                {context.collapse && (
                  <>
                    <Text
                      me="auto"
                      color={
                        //activeRoute(route.layout.toLowerCase() + route.path.toLowerCase())
                        activeRoute(route.path) ? activeColor : textColor
                      }
                      fontWeight={
                        //activeRoute(route.layout.toLowerCase() + route.path.toLowerCase())
                        activeRoute(route.path) ? "bold" : "normal"
                      }
                      ml={"10px"}
                    >
                      {route.name}
                    </Text>
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
      ) : (
        //path 없을때(하위 메뉴 있는 대메뉴)
        <Box
          onClick={() => {
            setRouteStat(route.layout.toLowerCase());
            LNBroute(route);
          }}
          cursor={"pointer"}
          key={index}
          h={"50px"}
        >
          <HStack
            spacing={
              //activeRoute(route.layout.toLowerCase()) ? "22px" : "26px"
              activeRoute(route.path) ? "22px" : "26px"
            }
            py="5px"
            ps="10px"
          >
            <Flex w="100%" alignItems="center" justifyContent="center">
              <Box
                color={
                  //activeRoute(route.layout.toLowerCase())
                  activeRoute(route.path) ? activeIcon : textColor
                }
                w={"20px"}
                h={"20px"}
              >
                {route.icon}
              </Box>
              {context.collapse && (
                <>
                  <Text
                    me="auto"
                    color={
                      //activeRoute(route.layout.toLowerCase())
                      activeRoute(route.path) ? activeColor : textColor
                    }
                    fontWeight={
                      //activeRoute(route.layout.toLowerCase())
                      activeRoute(route.path) ? "bold" : "normal"
                    }
                    ml={"10px"}
                  >
                    {route.name}
                  </Text>
                  {route.items && <ChevronRightIcon />}
                </>
              )}
            </Flex>
            <Box
              h="36px"
              w="4px"
              bg={
                //activeRoute(route.layout.toLowerCase())
                activeRoute(route.path) ? brandColor : "transparent"
              }
              borderRadius="5px"
            />
          </HStack>
        </Box>
      );
    });
  };
  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
