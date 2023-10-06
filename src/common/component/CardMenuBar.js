import {
  Box,
    Button,
    Flex,
    Spacer,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React from "react";;
  
  const CardMenuBar = ({ title, count, handelOnClik, buttonType, btnText }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textNumColor = useColorModeValue("brand.500", "white");
  
    return (
      <Flex
        align={{ sm: "flex-start", lg: "center" }}
        justify="space-between"
        w="100%"
        px="22px"
        pb="20px"
        mb="10px"
      // boxShadow="0px 40px 58px -20px rgba(112, 144, 176, 0.26)"
      >
        <Flex w="100%">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
            marginRight={2}
          >
            {title}
          </Text>
          
          {/* 검색 항목 수  */}
          <Text
            color={textNumColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            {count}
          </Text>
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            건
          </Text>
        </Flex>
        {buttonType &&
          <Button variant="action"
            onClick={() => 
              handelOnClik()
            }
          >{btnText}</Button>
        }
      </Flex>
  
    );
  };
  
  export default CardMenuBar;
  