import { Box, Grid, useColorModeValue, Button, Flex, Text, Spacer, GridItem, Select, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const MenuTab = () => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textNumColor = useColorModeValue("brand.500", "white");
    return (
        <Box>
            {/* 메뉴 상단 */}
            <Flex
                align={{ sm: "flex-start", lg: "center" }}
                justify="space-between"
                w="100%"
                px="22px"
                pb="20px"
                mb="10px"
                bg="white"
            >
                <Flex w="100%">
                    <Box m={2} >
                        <Text
                            color={textNumColor}
                            fontSize="18px"
                            fontWeight="700"
                            lineHeight="100%"
                        >
                            {'전체'}
                        </Text>
                    </Box>
                    <Box m={2} >
                        <Text
                            color={textColor}
                            fontSize="18px"
                            fontWeight="500"
                            lineHeight="100%"
                        >
                            {'사용자메뉴'}
                        </Text>
                    </Box>
                    <Box m={2} >
                        <Text
                            color={textColor}
                            fontSize="18px"
                            fontWeight="500"
                            lineHeight="100%"
                        >
                            {'관리자메뉴'}
                        </Text>
                    </Box>
                </Flex>
                
                <Button variant="action"
                    onClick={() => {  // setCoCd 초기화
                    }}
                >수정</Button>
                <Spacer />
                <Button variant="action"
                    onClick={() => {  // setCoCd 초기화
                    }}
                >변경이력</Button>
            </Flex>
          </Box>
    );
};

export default MenuTab;
