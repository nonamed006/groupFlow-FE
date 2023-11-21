import React, { useContext, useEffect, useState } from "react";

// chakra imports
import {
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
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
  const [route, setRoute] = useState();

  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarMargins = "0px";

  const context = useContext(SidebarContext);

  const mouseEvent = (flag) => {
    if (flag) {
      document.querySelector(".box_GNB").classList.remove("non_active");
      document.querySelector(".box_GNB").classList.add("active");
    } else {
      document.querySelector(".box_GNB").classList.remove("active");
      document.querySelector(".box_GNB").classList.add("non_active");
    }
    context.setCollapse(flag);
  };

  const onClickHandler = () => {
    mouseEvent(false);
    document.querySelector('.box_LNB').classList.remove('non_active')
    document.querySelector('.box_LNB').classList.add('active')
  }

  useEffect(() => {
    mouseEvent(false);
    if (route == null) {
      document.querySelector(".box_LNB").classList.remove("active");
      document.querySelector(".box_LNB").classList.add("non_active");
    } else {
      if(route.items.length > 0) {
        document.querySelector(".box_LNB").classList.add("active");
        document.querySelector(".box_LNB").classList.remove("non_active");
      }
    }
  }, [route]);

  // SIDEBAR
  return (
    <Box display={{ sm: "none", xl: "block" }} w="fit-content" position='fixed' minH='100%' >
          <Box
            bg={sidebarBg}
				    w={'300px'}
            className="box_LNB non_active"
            h='full'
            m={sidebarMargins}
            minH='100%'
            overflowX='hidden'
            position='absolute'
            onMouseOver={() => {
              document.querySelector('.box_LNB').classList.remove('non_active')
              document.querySelector('.box_LNB').classList.add('active')
            }}
            onMouseLeave={() => {
              document.querySelector('.box_LNB').classList.remove('active')
              document.querySelector('.box_LNB').classList.add('non_active')
            }}
          >
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
              >
              <ContentLNB routes={routes} route={route} LNBroute={setRoute}/>
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
              >
              <ContentGNB routes={routes} LNBroute={setRoute} onClickHandler={onClickHandler} />
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
