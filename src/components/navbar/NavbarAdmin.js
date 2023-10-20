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
import { CloseIcon } from "@chakra-ui/icons";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  const { secondary, message, brandText, location } = props;

  //방문한 페이지 추가
  const updateHistory = () => {
    const isUniqueProps = (newProps) => {
      return !history.some(
        (item) => item.location.pathname === newProps.location.pathname
      );
    };
    // props가 중복되지 않으면 추가
    if (isUniqueProps(props)) {
      const newProps = { ...props };
      // 최대 5개까지만 저장
      if (history.length < 5) {
        setHistory([...history, newProps]);
      } else {
        // 5개가 넘으면 가장 오래된 것 삭제
        history.shift();
        setHistory([...history, newProps]);
      }
    }
  };
  //방문한 페이지 삭제
  const pageDelete = (item, index) => () => {
    if (item.location.pathname === props.location.pathname) {
      alert("현재 페이지는 삭제할 수 없습니다.");
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
  }, [props.location.pathname]);

  return (
    <Box
      position="absolute"
      display={secondary ? "block" : "flex"}
      lineHeight="25.6px"
      right={{ base: "250px" }} //상단 바 위치 수정
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top={{ base: "0", md: "0", lg: "0", xl: "0" }}
      w={{
        base: "calc(100vw - 6%)",
        md: "calc(100vw - 8%)",
        lg: "calc(100vw - 6%)",
        xl: "calc(100vw - 350px)",
        "2xl": "calc(100vw - 365px)",
      }}
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
                Pages
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
            href={location.pathname}
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
        {history?.length > 0 &&
          history?.map((item, index) => {
            return (
              <Box
                display="flex"
                borderRadius="16px"
                borderWidth="1.5px"
                borderStyle="solid"
                w={130}
              >
                <NavLink to={item?.location?.pathname}>
                  <div
                    style={{
                      height: "50px",
                      lineHeight: "40px",
                      textAlign: "center",
                    }}
                  >
                    <Text
                      color={
                        props.location.pathname === item.location.pathname
                          ? secondaryText2
                          : secondaryText
                      }
                      fontSize="sm"
                      mb="5px"
                      ml="10px"
                      display={{ base: "none", md: "block" }}
                    >
                      {item.brandText.length > 8
                        ? item.brandText.slice(0, 8) + "..."
                        : item.brandText}
                    </Text>
                  </div>
                </NavLink>
                <Spacer />
                <div
                  style={{
                    height: "40px",
                    lineHeight: "37px",
                    textAlign: "center",
                  }}
                >
                  <CloseIcon w={3} h={3} onClick={pageDelete(item, index)} />
                </div>
              </Box>
            );
          })}
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
