// Chakra imports
import { Portal, Box, useDisclosure, HStack, Flex } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAdmin";
//import Navbar from 'components/navbar/NavbarSystem.js';
import Sidebar from "components/sidebar/Sidebar.js";
import React, { useEffect, useMemo, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
import CommonAlert from "common/component/CommonAlert";
import { SidebarContext } from "contexts/SidebarContext";
import "../../assets/css/Sidebar.css"

/*
layouts/admin/index.js
 - 왼편 고정된 메뉴바 등 담은 템플릿
*/

// Custom Chakra theme
export default function Dashboard(props) {
  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
  });
  // 사용자가 요청한 PATH를 찾아서 반환
  const findPath = (data, targetPath) => {
    for (const item of data) {
      if (item.layout + item.path === targetPath) {
        return item; // 원하는 항목을 찾았을 때 반환
      }
      if (item.items && item.items.length > 0) {
        const result = findPath(item.items, targetPath);
        if (result) {
          return result; // 중첩된 항목에서 찾았을 때 반환
        }
      }
    }
    return null; // 원하는 항목을 찾지 못한 경우
  };
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        //찾은 PATH값의 NAME을 반환
        activeRoute = findPath(routes, props.location.pathname).name;
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.items) {
        return getRoutes(prop.items);
      }
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  };
  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();
  const [collapse, setCollapse] = useState(false);

  return (
    <Box>
			<Box>
				<SidebarContext.Provider
					value={{
						collapse,
						setCollapse
					}}>
          <Box
            className="box non_active"
            w={'70px'}
            h="full"
            bg="black"
            position={'absolute'}
            zIndex={1}
          >
            <Sidebar
              routes={routes}
              display='none'
              {...rest} />
          </Box>
					<Box
						float='right'
						minHeight='100vh'
						height='100%'
						overflow='auto'
						position='relative'
						maxHeight='100%'
						as="main"
						w={{ base: '100%', xl: 'calc( 100% - 70px )' }}
						transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
						transitionDuration='.2s, .2s, .35s'
						transitionProperty='top, bottom, width'
						transitionTimingFunction='linear, linear, ease'>
						<Portal>
							<Box>
                <Navbar
                  onOpen={onOpen}
                  logoText={"Horizon UI Dashboard PRO"}
                  brandText={getActiveRoute(routes)}
                  secondary={getActiveNavbar(routes)}
                  message={getActiveNavbarText(routes)}
                  setAlertInfo={setAlertInfo}
                  fixed={fixed}
                  routes={routes}
                  {...rest}
                />
							</Box>
						</Portal>
						<Box
              mx="auto"
              p={{ base: "20px", md: "30px" }}
              pe="20px"
              minH="100vh"
              pt="30px"
            >
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/" to="/system/corporation" />
              </Switch>
              {alertInfo.isOpen && (
                <CommonAlert alertInfo={alertInfo} setAlertInfo={setAlertInfo} />
              )}
            </Box>
						<Box>
							<Footer />
						</Box>
					</Box>
				</SidebarContext.Provider>
			</Box>
		</Box>
  );
}
