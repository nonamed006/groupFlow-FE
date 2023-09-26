import React, { useEffect, useState } from "react";

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
  const [ GNBcollapse, setGNBCollapse ] = useState(collapse);
	const [ LNBcollapse, setLNBCollapse ] = useState(false);
  const [ route, setRoute ] = useState();
  useEffect(() => {
    return setGNBCollapse(collapse);
  }, [collapse])

  useEffect(() => {
    if(route != null && route.items != null) {
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

  // SIDEBAR
  return (
    <Box display={{ sm: "none", xl: "block" }} w="100%" position='fixed' minH='100%'>
          <Box
            bg={sidebarBg}
            // borderRight='1px'
            // borderRightColor='gray'
				    w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            maxW={LNBcollapse ? 300 : 70}
            h='100vh'
            m={sidebarMargins}
            minH='100%'
            overflowX='hidden'
            position='absolute'
            display={LNBcollapse ? 'block' : 'none'}
            onMouseOver={() => setLNBCollapse(true)}
            onMouseLeave={() => setLNBCollapse(false)}
          >
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
              <ContentLNB routes={routes} route={route} collapse={collapse} LNBroute={setRoute} setCollapse={setCollapse}/>
            </Scrollbars>
          </Box>

          {/* GNB 영역 추가 */}
          <Box
            bg={sidebarBg}
            // borderRight='1px'
            // borderRightColor='gray'
				    w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            maxW={GNBcollapse ? 300 : 70}
            h='100vh'
            m={sidebarMargins}
            minH='100%'
            overflowX='hidden'
            position='absolute'
          >
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
              onClick={() => {
                  setGNBCollapse(false);
                }
              }
              onMouseOver={() => setGNBCollapse(true)}>
              <ContentGNB routes={routes} collapse={GNBcollapse} LNBroute={setRoute}/>
            </Scrollbars>
          </Box>
      {/* ! GNB 영역 추가 */}
    </Box>
  );
}

// FUNCTIONS
export function SidebarResponsive(props) {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { routes } = props;
  //  BRAND

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems='center'>
      <Flex ref={btnRef} w='max-content' h='max-content' onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my='auto'
          w='20px'
          h='20px'
          me='10px'
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w='285px' maxW='285px' bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex='3'
            onClose={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW='285px' px='0rem' pb='0'>
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
              <Content routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
// PROPS

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default Sidebar;
