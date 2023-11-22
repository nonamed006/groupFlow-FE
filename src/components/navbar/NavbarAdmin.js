// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import AdminNavbarLinks from "components/navbar/NavbarLinksAdmin";
import { NavLink } from "react-router-dom";
import { CloseIcon, CopyIcon } from "@chakra-ui/icons";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  const { secondary, message, brandText, location, pathText, routes } = props;

  //방문한 페이지 추가
  const updateHistory = () => {
    if (props.brandText !== "") {
      const isUniqueProps = (newProps) => {
        return !history.some(
          (item) => item.location.pathname === newProps.location.pathname
        );
      };
      // props가 중복되지 않으면 추가
      if (isUniqueProps(props)) {
        const newProps = { ...props };

        if (newProps.location.pathname === "/MU000000") {
          return false;
        }

        // 최대 5개까지만 저장
        if (history.length < 5) {
          console.log(history);
          setHistory([newProps, ...history]);
        } else {
          // 5개가 넘으면 가장 오래된 것 삭제
          history.pop();
          setHistory([newProps, ...history]);
        }
      }
    }
  };
  //방문한 페이지 삭제
  const pageDelete = (item, index) => () => {
    if (item.location.pathname === props.location.pathname) {
      props.setAlertInfo({
        isOpen: true,
        title: "현재 페이지는 삭제할 수 없습니다.",
        status: "warning",
        width: "fit-content",
      });
      //alert("현재 페이지는 삭제할 수 없습니다.");
      return false;
    }
    const newHistory = history.filter((item, i) => i !== index);
    setHistory(newHistory);
  };

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue("navy.700", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  let secondaryText2 = useColorModeValue("red.700", "white");
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
  useEffect(() => {
    updateHistory();
  }, [props]);

  return (
    <Box
      //position="absolute"
      display={secondary ? "block" : "flex"}
      //lineHeight="25.6px"
      //right={{ base: "250px" }} //상단 바 위치 수정
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top={{ base: "0", md: "0", lg: "0", xl: "0" }}
      // w={{
      //   base: "calc(100vw - 6%)",
      //   md: "calc(100vw - 8%)",
      //   lg: "calc(100vw - 6%)",
      //   xl: "calc(100vw - 350px)",
      //   "2xl": "calc(100vw - 365px)",
      // }}
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
        <Box mr={"10px"} mb={{ sm: "8px", md: "0px" }} w={"220px"}>
          <Text w={"100%"} fontSize={"12px"}>
            {pathText}
          </Text>
          {/* <Breadcrumb> */}
          {/* <BreadcrumbItem color={secondaryText} fontSize="sm" mb="5px">
              <BreadcrumbLink href="#" color={secondaryText}>
                Pages
              </BreadcrumbLink>
            </BreadcrumbItem> */}

          {/* <BreadcrumbItem color={secondaryText} fontSize="sm">
              <BreadcrumbLink href="#" color={secondaryText}>
                {/* {brandText}}
                {pathText}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb> */}
          {/* Here we create navbar brand, based on route name */}
          <Link
            display={"block"}
            w={"100%"}
            color={mainText}
            href={location.pathname}
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            fontSize={brandText.length > 7 ? "17px" : "25px"} //"34px"
            textOverflow={"ellipsis"}
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
        <Flex
          h={"full"}
          // overflowX={'scroll'}
          // css={{'&::-webkit-scrollbar':{'display':'none'}}}
          pt={"15px"}
          mx={"15px"}
        >
          {history?.length > 0 &&
            history?.map((item, index) => {
              return (
                <Box
                  display="flex"
                  borderRadius="5px"
                  borderWidth="1.5px"
                  borderStyle="solid"
                  marginRight={"5px"}
                  borderColor={
                    props.location.pathname === item.location.pathname
                      ? "navy.500"
                      : "gray.500"
                  }
                  color={
                    props.location.pathname === item.location.pathname
                      ? "navy.300"
                      : "gray.500"
                  }
                  backgroundColor={
                    props.location.pathname === item.location.pathname
                      ? "white"
                      : //: "navy.30"
                        "#F4F7FE"
                  }
                  w={135}
                  height={"35px"}
                  key={index}
                >
                  <div
                    style={{
                      height: "35px",
                      lineHeight: "30px",
                      marginLeft: "5px",
                    }}
                  >
                    <CopyIcon></CopyIcon>
                  </div>

                  <NavLink to={item?.location?.pathname}>
                    <div
                      style={{
                        width: "90px",
                        height: "35px",
                        lineHeight: "35px",
                      }}
                    >
                      <Text
                        fontSize="sm"
                        mb="5px"
                        ml="10px"
                        fontWeight={700}
                        overflow={"hidden"}
                        whiteSpace={"nowrap"}
                        textOverflow={"ellipsis"}
                      >
                        {item.brandText}
                      </Text>
                    </div>
                  </NavLink>
                  <Spacer />
                  <div
                    style={{
                      height: "35px",
                      lineHeight: "30px",
                      marginRight: "8px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <CloseIcon
                      width={"10px"}
                      height={"10px"}
                      onClick={pageDelete(item, index)}
                    />
                  </div>
                </Box>
              );
            })}
        </Flex>
        <Box ms="auto" w="300px">
          <AdminNavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
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
