// Chakra imports
import { Portal, Box, useDisclosure, HStack, Flex } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAdmin";
//import Navbar from 'components/navbar/NavbarSystem.js';
import Sidebar from "components/sidebar/Sidebar.js";
import React, { useEffect, useMemo, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
//import routes from "routes.js";
import routes from "routes.js";
import CommonAlert from "common/component/CommonAlert";
import { SidebarContext } from "contexts/SidebarContext";
import "../assets/css/Sidebar.css"
import HomePage from "views/system/home";

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
      //if (item.layout + item.path === targetPath) {
        console.log(item.layout + item.path, targetPath);
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

  // 페이지 경로 이름 리턴
  const test = (routes, gnb) => {
    let pathArray = window.location.pathname.split('/').filter((path) => path !== ''); // 공백 제거한 path 배열
    pathArray.shift();
    let pathNow = pathArray.pop(); // 현재 path 코드(상단에 보여줄 경로에서는 빼고 리턴값으로 받아 현재 페이지 이름 보여주기 위해 pop)
    let pathNowName = ''; // 현재 path 이름
    let pathString = '';  // path 전체 이름
    console.log(pathArray);
    let filtedRoutes = routes.filter((route) => route.code === pathArray[0]); // 현재에 맞는 대메뉴만 들고옴
    
      
    
    switch(gnb) {
      case 'pathText' :
        //pathString += route.name + ' / ';
          //if(route.items.length > 0) { // 없어도 무방
        pathArray.forEach((path) => { // MU230001/MU230002
          //filtedRoutes.forEach(route => { // MU230001...
            pathString += testFor(filtedRoutes, path, pathString) + ' / ';
          //})
          //} // 없어도 무방
        })
        return pathString;
      case 'routeText' :
        pathNowName = testFor(filtedRoutes, pathNow, pathNowName);
        return pathNowName;
    }
    //return pathString;
  }

  // 하위 라우터들 돌며 경로 이름 추가
  const testFor = (routes, path, pathString) => {
    routes.forEach((route) => {
      if(route.code === path) {
        pathString = route.name;
      } else {
        if(route.items.length > 0) {
          pathString = testFor(route.items, path, pathString);
        }
      }

      
    })

    return pathString;
  }

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
        if(findPath(routes, props.location.pathname) === null){
          return ;
        }else{
           //찾은 PATH값의 NAME을 반환
          activeRoute = findPath(routes, props.location.pathname).name;
        }
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
      if (prop.items.length > 0) {
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
  const { onOpen } = useDisclosure();
  const [collapse, setCollapse] = useState(false);

  return (
    <Box h={'1000px'}>
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
            position={'absolute'}
            zIndex={1}
            overflowX={'hidden'}
          >
            <Sidebar
              routes={routes}
              display='none'
              {...rest} />
          </Box>
					<Box
						float='right'
						w={'calc( 100% - 70px )' }
						h={'1000px'}
						overflow='auto'
						position='relative'
						maxHeight='100%'
						as="main"
            p={'30px'}
          >
							<Box w={'100%'} h={'fit-content'} pb={'20px'}>
                <Navbar
                  onOpen={onOpen}
                  logoText={"Horizon UI Dashboard PRO"}
                  pathText={test(routes, 'pathText')}
                  brandText={test(routes, 'routeText')}////getActiveRoute(routes)
                  secondary={getActiveNavbar(routes)}
                  message={getActiveNavbarText(routes)}
                  setAlertInfo={setAlertInfo}
                  routes={routes}
                  {...rest}
                />
							</Box>
						<Box
              h={'800px'}
            >
              <Switch>
                {getRoutes(routes)}
                <Route path='/MU000000/home' component={HomePage}/>
              {/* <Redirect from="/" to="/err/NotFound" /> */}
              </Switch>
              {alertInfo.isOpen && (
                <CommonAlert alertInfo={alertInfo} setAlertInfo={setAlertInfo} />
              )}
            </Box>
					</Box>
				</SidebarContext.Provider>
			</Box>
		</Box>
  );
}
