import { Box, Grid, useColorModeValue, Button, Flex, Text, Spacer, GridItem, Select, Input } from "@chakra-ui/react";
import ModalLayout from "common/modal/ModalLayout";
import React, { useState } from "react";
import TotalMenuBox from "./TotalMenuBox";
import { PORT } from "set";
import TotalMenuModal from "./TotalMenuModal";

const MenuTab = ({ rgCd }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textNumColor = useColorModeValue("brand.500", "white");
    const [isOpen, setIsOpen] = useState(false);    // 권한메뉴 수정 모달

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
                    onClick={() => setIsOpen(true)}
                >수정</Button>

            </Flex>

            {/* 수정버튼 클릭 시 권한메뉴 모달창 */}
            <TotalMenuModal isOpen={isOpen} setIsOpen={setIsOpen} rgCd={rgCd} />
        </Box>
    );
};

export default MenuTab;
