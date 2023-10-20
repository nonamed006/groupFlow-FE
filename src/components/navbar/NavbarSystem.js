// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import AdminNavbarLinks from "components/navbar/NavbarLinksAdmin";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const routes = props.routes;
  const location = props.location;
  const match = props.match;

  console.log(routes);
  const menu = location.pathname.split("/");
  const gnbMenu = routes.map((route) => {
    if (match.path === route.layout && !route.path) {
      return route.name;
    }
  });
  const findMenu = (route, pathname) => {
    const returnMenuString = "";
    if (route.layout.indexOf(pathname) || route.path.indexOf(pathname)) {
      returnMenuString += route.name + " /";
      if (route.items) {
        findMenu(route, pathname);
      }
    }
    route.map((item) => {
      if (item.path === match) {
        returnMenuString += item.path;
        if (item.items) {
          findMenu(item.items);
        }
      }
    });
    return returnMenuString;
  };
  const lnbMenu = routes.map((route) => {
    if (match.path === route.layout) {
      return findMenu(route);
    }
  });
  console.log(props);
  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  const { secondary, message, brandText } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue("navy.700", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  let navbarPosition = "fixed";
  let navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  let navbarShadow = "none";
  let navbarBg = useColorModeValue(
    "rgba(244, 247, 254, 0.2)",
    "rgba(11,20,55,0.5)"
  );
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingX = "15px";
  let gap = "0px";
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Box
      position={"absolute"}
      left={0}
      top={0}
      w={"full"}
      // boxShadow={navbarShadow}
      // bg={navbarBg}
      // borderColor={navbarBorder}
      // filter={navbarFilter}
      // backdropFilter={navbarBackdrop}
      // backgroundPosition='center'
      // backgroundSize='cover'
      // borderRadius='16px'
      // borderWidth='1.5px'
      // borderStyle='solid'
      // transitionDelay='0s, 0s, 0s, 0s'
      // transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
      // transition-property='box-shadow, background-color, filter, border'
      // transitionTimingFunction='linear, linear, linear, linear'
      // alignItems={{ xl: 'center' }}
      // display={secondary ? 'block' : 'flex'}
      // minH='75px'
      // justifyContent={{ xl: 'center' }}
      // lineHeight='25.6px'
      // mx='auto'
      // mt={secondaryMargin}
      // pb='8px'
      // right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
      // px={{
      // 	sm: paddingX,
      // 	md: '10px'
      // }}
      // ps={{
      // 	xl: '12px'
      // }}
      // pt='8px'
      // top={{ base: '12px', md: '16px', lg: '20px', xl: '20px' }}
      // w={{
      // 	base: 'calc(100vw - 6%)',
      // 	md: 'calc(100vw - 8%)',
      // 	lg: 'calc(100vw - 6%)',
      // 	xl: 'calc(100vw - 300px)',
      // 	'2xl': 'calc(100vw - 365px)'
      // }}>
      //w='100%'>
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
        mb={gap}
      >
        <Box mb={{ sm: "8px", md: "0px" }}>
          <Breadcrumb>
            <BreadcrumbItem color={secondaryText} fontSize="sm" mb="5px">
              <BreadcrumbLink href="#" color={secondaryText}>
                {gnbMenu}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color={secondaryText} fontSize="sm">
              <BreadcrumbLink href="#" color={secondaryText}>
                {brandText}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* Here we create navbar brand, based on route name */}
          <Link
            color={mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            fontSize="34px"
            _hover={{ color: { mainText } }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            {brandText}
          </Link>
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
            scrolled={scrolled}
          />
        </Box>
      </Flex>
      {secondary ? <Text color="white">{message}</Text> : null}
    </Box>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
