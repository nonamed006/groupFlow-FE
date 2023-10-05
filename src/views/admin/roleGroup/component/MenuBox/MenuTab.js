import { Box, Grid, useColorModeValue, Button, Flex, Text} from "@chakra-ui/react";
import React from "react";

const MenuTab = ({ typeCd, setIsOpen, setTypeCd }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textNumColor = useColorModeValue("brand.500", "white");
    const menuTypeList = [
        {
            typeCd : undefined,
            typeNm: '전체'
        },
        {
            typeCd : 'MUA0003',
            typeNm: '사용자'
        },
        {
            typeCd : 'MUA0002',
            typeNm: '관리자'
        },
    ];

    return (
        <Box>
            {/* 메뉴 상단 */}
            <Flex
                align={{ sm: "flex-start", lg: "center" }}
                justify="space-between"
                w="100%"
                borderBottom={'1px'}
                borderColor={'#CFD0D2'}
                mb="10px"
                pb="13px"
                bg="white"
            >
                <Flex w="100%">
                    {menuTypeList &&
                        menuTypeList.map((menuType)=>{
                            return  (
                            <Button  bg={'white'} onClick={()=>setTypeCd(menuType.typeCd)}>
                                 <Text
                                    color={typeCd==menuType.typeCd?textNumColor:textColor}
                                    fontSize="18px"
                                    fontWeight="700"
                                    lineHeight="100%"
                                > 
                                {menuType.typeNm}
                             </Text> 
                        </Button>);
                        })
                    }
                </Flex>

                <Button variant="action"
                    onClick={() => setIsOpen(true)}
                >수정</Button>
            </Flex>
        </Box>
    );
};

export default MenuTab;
