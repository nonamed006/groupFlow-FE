import {
    Box, Flex, Text, useColorModeValue
  } from "@chakra-ui/react"
  import React from "react";

  const CardListTitle = ({ corpDepNm, totalCnt }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textNumColor = useColorModeValue("brand.500", "white");
  
    return (
        <Box h={'50px'} mb={2} p={2}  lineHeight={"40px"}
          textAlign={"center"}>
          <Flex justify={'space-between'} alignItems={"center"}>
            <Text
              fontSize={"20px"}
              fontWeight={600}
              color={textColor}
            >
              {corpDepNm}
            </Text>
            <Flex>
              <Text
                color={textNumColor}
                fontSize={"18px"}
                fontWeight={500}
              >
                {totalCnt}
              </Text>
              <Text
                color={textColor}
                fontSize={"18px"}
                fontWeight={500}
              >
                건
              </Text>
            </Flex>
  
          </Flex>
        </Box>
      
    );
  };
  
  export default CardListTitle;
  