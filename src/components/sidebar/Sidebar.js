import React, { useContext, useEffect, useState } from "react";

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Content from "components/sidebar/components/Content";
import ContentGNB from "./components/ContentGNB";
import ContentLNB from "./components/ContentLNB";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";

// Assets
import { IoMenuOutline } from "react-icons/io5";
import "../../assets/css/Sidebar.css";

import { SidebarContext } from "contexts/SidebarContext";

/*
작업자 : 이혜윤
작업명 : Sidebar.js
 - 왼쪽 고정 메뉴
 - 메뉴 아이콘 마우스오버 시 GNB 나오도록 작업
*/

function Sidebar(props) {
  const { routes } = props;
  const { collapse } = props;
  const { setCollapse } = props;
  const [GNBcollapse, setGNBCollapse] = useState(collapse);
  const [LNBcollapse, setLNBCollapse] = useState(false);
  const [route, setRoute] = useState();
  useEffect(() => {
    return setGNBCollapse(collapse);
  }, [collapse]);

  useEffect(() => {
    if (route != null && route.items != null) {
      return setLNBCollapse(true);
    } else {
      return setLNBCollapse(false);
    }
  }, [route]);

  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarMargins = "0px";

  const context = useContext(SidebarContext);

  const mouseEvent = (flag) => {
    if (flag) {
      document.querySelector(".box_GNB").classList.remove("non_active");
      document.querySelector(".box_GNB").classList.add("active");

      // document.querySelector('.box_LNB').classList.remove('active')
      // document.querySelector('.box_LNB').classList.add('non_active')
    } else {
      document.querySelector(".box_GNB").classList.remove("active");
      document.querySelector(".box_GNB").classList.add("non_active");

      // document.querySelector('.box_LNB').classList.remove('non_active')
      // document.querySelector('.box_LNB').classList.add('active')
    }
    context.setCollapse(flag);
  };

  useEffect(() => {
    console.log(route);
    if (route === null) {
      mouseEvent(false);
      document.querySelector(".box_LNB").classList.remove("active");
      document.querySelector(".box_LNB").classList.add("non_active");
    }
  }, [route]);

  // SIDEBAR
  return (
    <Box display={{ sm: "none", xl: "block" }} w="fit-content" position='fixed' minH='100%' >
          <Box
            bg={sidebarBg}
            // borderRight='1px'
            // borderRightColor='gray'
				    w={'300px'}
            // maxW={LNBcollapse ? 300 : 70}
            className="box_LNB non_active"
            h='full'
            m={sidebarMargins}
            minH='100%'
            overflowX='hidden'
            position='absolute'
            //display={!context.collapse ? 'block' : 'none'}
            onMouseOver={() => {
              document.querySelector('.box_LNB').classList.remove('non_active')
              document.querySelector('.box_LNB').classList.add('active')
            }}
            onMouseLeave={() => {
              document.querySelector('.box_LNB').classList.remove('active')
              document.querySelector('.box_LNB').classList.add('non_active')
              // context.setCollapse(false);
            }}
          >
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
              // onClick={() => {
              //     mouseEvent(false);
              //       document.querySelector('.box_LNB').classList.remove('active')
              //       document.querySelector('.box_LNB').classList.add('non_active')
              //   }
              // }
              >
              <ContentLNB routes={routes} route={route} collapse={collapse} LNBroute={setRoute} setCollapse={setCollapse}/>
            </Scrollbars>
          </Box>

          {/* GNB 영역 추가 */}
          <Box
            bg={sidebarBg}
            className="box_GNB non_active"
            h='full'
            m={sidebarMargins}
            minH='100%'
            overflowX='hidden'
            position='absolute'
            onMouseOver={() => {
              mouseEvent(true);
            }}
            onMouseLeave={() => {
              mouseEvent(false);
            }}
          >
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
              className="scrollbar"
              onClick={() => {
                  mouseEvent(false);
                  document.querySelector('.box_LNB').classList.remove('non_active')
                  document.querySelector('.box_LNB').classList.add('active')
                }
              }
              // onMouseOver={() => setGNBCollapse(true)}
              // onMouseLeave={() => setGNBCollapse(false)}
              >
              <ContentGNB routes={routes} LNBroute={setRoute}/>
            </Scrollbars>
          </Box>
      {/* ! GNB 영역 추가 */}
    </Box>
  );
}

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default Sidebar;
